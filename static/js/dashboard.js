// ── STATE ──────────────────────────────────────────────────────
let allIntel = [];
let markers  = [];
let activeTypeFilter   = 'ALL';
let activeThreatFilter = null;
let map;

// ── INIT MAP ───────────────────────────────────────────────────
function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false })
         .setView([22.5, 78.5], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  L.control.zoom({ position: 'bottomleft' }).addTo(map);

  map.on('mousemove', e => {
    document.getElementById('coord-display').textContent =
      `LAT ${e.latlng.lat.toFixed(4)} · LNG ${e.latlng.lng.toFixed(4)}`;
  });
}

// ── FETCH INTEL ────────────────────────────────────────────────
async function fetchIntel() {
  try {
    const res  = await fetch('/api/intel');
    const json = await res.json();
    allIntel = json.data || [];
    renderMarkers(allIntel);
    renderList(allIntel);
    fetchStats();
  } catch(e) {
    console.error('Intel fetch failed:', e);
  }
}

async function fetchStats() {
  try {
    const res  = await fetch('/api/stats');
    const s    = await res.json();
    document.getElementById('s-total').textContent = s.total;
    document.getElementById('s-osint').textContent = s.osint;
    document.getElementById('s-humint').textContent = s.humint;
    document.getElementById('s-imint').textContent = s.imint;
  } catch(e) {}
}

// ── MARKERS ────────────────────────────────────────────────────
function renderMarkers(data) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  data.forEach(item => {
    if (!item.lat || !item.lng) return;

    const el = document.createElement('div');
    el.className = `intel-marker ${item.type.toLowerCase()} ${item.threat_level || ''}`;

    const marker = L.marker([item.lat, item.lng], {
      icon: L.divIcon({ className: '', html: el, iconSize: [14, 14], iconAnchor: [7, 7] })
    }).addTo(map);

    // Hover tooltip
    const tip = `<div style="font-family:'Share Tech Mono',monospace;font-size:11px;color:#b8d4e8;
      background:#060f17;border:1px solid #1a4a65;padding:6px 10px;pointer-events:none">
      <b style="color:${typeColor(item.type)}">${item.type}</b> · ${item.title}
    </div>`;
    marker.bindTooltip(tip, { sticky: true, className: 'intel-tooltip', offset: [12, 0] });

    marker.on('click', () => openModal(item));
    markers.push(marker);
  });
}

function typeColor(t) {
  return t === 'OSINT' ? '#00e5ff' : t === 'HUMINT' ? '#ff6b35' : '#7c4dff';
}

// ── INTEL LIST ─────────────────────────────────────────────────
function renderList(data) {
  const el = document.getElementById('intel-list');
  el.innerHTML = '';
  data.slice(0, 30).forEach(item => {
    const div = document.createElement('div');
    div.className = `intel-item ${item.type.toLowerCase()}`;
    const t = item.timestamp ? new Date(item.timestamp).toLocaleString() : '—';
    div.innerHTML = `
      <div class="item-top">
        <span class="item-type ${item.type.toLowerCase()}">${item.type}</span>
        <span class="item-threat ${item.threat_level || 'low'}">${(item.threat_level||'low').toUpperCase()}</span>
      </div>
      <div class="item-title">${item.title}</div>
      <div class="item-time">${t}</div>`;
    div.onclick = () => openModal(item);
    el.appendChild(div);
  });
}

// ── FILTER ────────────────────────────────────────────────────
function applyFilters() {
  let data = allIntel;
  if (activeTypeFilter !== 'ALL')
    data = data.filter(d => d.type === activeTypeFilter);
  if (activeThreatFilter)
    data = data.filter(d => d.threat_level === activeThreatFilter);
  renderMarkers(data);
  renderList(data);
}

document.querySelectorAll('.fbtn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fbtn[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTypeFilter = btn.dataset.filter;
    applyFilters();
  });
});

document.querySelectorAll('.fbtn[data-threat]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (activeThreatFilter === btn.dataset.threat) {
      activeThreatFilter = null;
      btn.classList.remove('active');
    } else {
      document.querySelectorAll('.fbtn[data-threat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeThreatFilter = btn.dataset.threat;
    }
    applyFilters();
  });
});

// ── MODAL ─────────────────────────────────────────────────────
function openModal(item) {
  const badge = document.getElementById('m-type');
  badge.textContent   = item.type;
  badge.className     = `modal-badge ${item.type}`;

  document.getElementById('m-title').textContent  = item.title;
  document.getElementById('m-source').textContent = item.source || '—';
  document.getElementById('m-time').textContent   = item.timestamp
    ? new Date(item.timestamp).toLocaleString() : '—';
  document.getElementById('m-coords').textContent =
    `${Number(item.lat).toFixed(4)}, ${Number(item.lng).toFixed(4)}`;

  const tEl = document.getElementById('m-threat');
  tEl.textContent  = (item.threat_level || 'unknown').toUpperCase();
  tEl.style.color  = threatColor(item.threat_level);

  document.getElementById('m-desc').textContent = item.description || '—';

  const imgWrap = document.getElementById('m-image-wrap');
  if (item.image) {
    document.getElementById('m-image').src = item.image;
    imgWrap.classList.remove('hidden');
  } else {
    imgWrap.classList.add('hidden');
  }

  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});

function threatColor(t) {
  return {critical:'#ff1744',high:'#ff6b35',medium:'#ffca28',low:'#69f0ae'}[t] || '#b8d4e8';
}

// ── UPLOAD ────────────────────────────────────────────────────
const dropZone  = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const upStatus  = document.getElementById('upload-status');

['dragenter','dragover'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.add('dragover'); })
);
['dragleave','drop'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.remove('dragover'); })
);
dropZone.addEventListener('drop', e => handleFiles(e.dataTransfer.files));
fileInput.addEventListener('change', e => handleFiles(e.target.files));
dropZone.addEventListener('click', () => fileInput.click());

async function handleFiles(files) {
  if (!files.length) return;
  upStatus.textContent = '⟳ UPLOADING...';
  upStatus.className = 'upload-status';

  const fd = new FormData();
  let hasImage = false;

  for (const f of files) {
    const ext = f.name.split('.').pop().toLowerCase();
    if (ext === 'csv')  fd.append('csv_file', f);
    else if (['xlsx','xls'].includes(ext)) fd.append('excel_file', f);
    else if (ext === 'json') fd.append('json_file', f);
    else if (['jpg','jpeg','png'].includes(ext)) {
      fd.append('image_file', f);
      fd.append('title', f.name);
      hasImage = true;
    }
  }

  try {
    const res  = await fetch('/api/upload', { method: 'POST', body: fd });
    const json = await res.json();
    if (json.status === 'ok') {
      allIntel = [...allIntel, ...json.data];
      applyFilters();
      fetchStats();
      upStatus.textContent = `✓ ${json.count} NODE(S) LOADED`;
    } else {
      upStatus.textContent = `✗ ${json.message}`;
      upStatus.className = 'upload-status error';
    }
  } catch(e) {
    upStatus.textContent = '✗ UPLOAD FAILED';
    upStatus.className = 'upload-status error';
  }
}

// ── CLOCK ─────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  document.getElementById('live-time').textContent =
    now.toUTCString().replace('GMT','UTC');
}
setInterval(updateClock, 1000);
updateClock();

// ── BOOT ──────────────────────────────────────────────────────
initMap();
fetchIntel();