import { useEffect, useState } from 'react';
import useSWR from 'swr';
import api, { fetcher } from '../lib/api.js';

const ResumeSection = () => {
  const { data: about, isLoading, error } = useSWR('/about', fetcher);
  const resumeUrl = about?.resume_url;
  const [downloadStatus, setDownloadStatus] = useState('idle');

  const handleDownload = () => {
    if (!resumeUrl) return;
    setDownloadStatus('idle');

    api
      .get(resumeUrl, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Chirag-Bhandarkar-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setDownloadStatus('success');
      })
      .catch(() => {
        setDownloadStatus('error');
      });
  };

  useEffect(() => {
    if (downloadStatus === 'idle') return;
    const timer = setTimeout(() => {
      setDownloadStatus('idle');
    }, 3000);
    return () => clearTimeout(timer);
  }, [downloadStatus]);

  return (
    <section id="resume" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">Resume</div>
      <div className="card" style={{ textAlign: 'center' }} data-aos="zoom-in">
        {isLoading && <p>Loading resume...</p>}
        {error && <p>Unable to load resume right now.</p>}
        {!isLoading && !error && !resumeUrl && (
          <p>Resume is not available yet. Please check back soon.</p>
        )}
        {!isLoading && !error && resumeUrl && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <iframe
                src={resumeUrl}
                title="Resume PDF"
                style={{ width: '100%', height: '600px', borderRadius: '16px', border: '1px solid #2a2b33' }}
              />
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="project-link project-link-primary"
            >
              Download Resume (PDF)
            </button>
            {(downloadStatus === 'success' || downloadStatus === 'error') && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  zIndex: 50,
                }}
              >
                <div
                  style={{
                    minWidth: '280px',
                    maxWidth: '90%',
                    padding: '18px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#171821',
                    border: '1px solid #2a2b33',
                    color: '#f5e8c7',
                    boxShadow: '0 18px 40px rgba(0,0,0,0.6)',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <strong>
                      {downloadStatus === 'success' ? 'Download started' : 'Download failed'}
                    </strong>
                    <button
                      type="button"
                      onClick={() => setDownloadStatus('idle')}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: '#e2cfa3',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    {downloadStatus === 'success'
                      ? 'Your resume download has started successfully.'
                      : 'Unable to start resume download. Please try again.'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ResumeSection;
