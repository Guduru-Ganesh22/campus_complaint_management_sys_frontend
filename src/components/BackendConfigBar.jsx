import { useState } from 'react';
import { getApiUrl, setApiUrl, DEFAULT_BACKEND_URL } from '../config';

export default function BackendConfigBar() {
  const current = getApiUrl();
  const isHosted = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const isLocalhost = current.includes('localhost') || current.includes('127.0.0.1');

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(isLocalhost && isHosted ? DEFAULT_BACKEND_URL : current);

  const save = (e) => {
    e.preventDefault();
    if (url.trim()) {
      setApiUrl(url.trim());
      window.location.reload();
    }
  };

  const resetToDefault = () => {
    setApiUrl(DEFAULT_BACKEND_URL);
    window.location.reload();
  };

  return (
    <div style={{
      background: (isLocalhost && isHosted) ? '#fef2f2' : '#f0fdf4',
      border: (isLocalhost && isHosted) ? '1px solid #f87171' : '1px solid #86efac',
      borderRadius: '8px',
      padding: '10px 14px',
      marginBottom: '16px',
      fontSize: '0.85rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>
          <strong style={{ color: (isLocalhost && isHosted) ? '#b91c1c' : '#166534' }}>
            {(isLocalhost && isHosted) ? '⚠️ Backend:' : '🟢 Backend:'}
          </strong>{' '}
          <code style={{ background: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            {current}
          </code>
        </span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}
        >
          {open ? 'Hide' : 'Change'}
        </button>
      </div>

      {isLocalhost && isHosted && (
        <div style={{ marginTop: '8px' }}>
          <button
            type="button"
            onClick={resetToDefault}
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
          >
            Switch to Live Render Backend
          </button>
        </div>
      )}

      {open && (
        <form onSubmit={save} style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={DEFAULT_BACKEND_URL}
            required
            className="form-control"
            style={{ fontSize: '0.85rem', padding: '4px 8px' }}
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }}>
            Save URL
          </button>
        </form>
      )}
    </div>
  );
}
