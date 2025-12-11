import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

const formatMonthYear = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getEffectiveEndDate = (rawEndValue) => {
  if (!rawEndValue) return null;
  const end = new Date(rawEndValue);
  if (Number.isNaN(end.getTime())) return null;
  const now = new Date();
  // If end date is in the future, treat as ongoing (Present)
  if (end > now) return null;
  return rawEndValue;
};

const formatDuration = (startValue, endValue) => {
  if (!startValue) return '';
  const start = new Date(startValue);
  const effectiveEndValue = getEffectiveEndDate(endValue);
  const end = effectiveEndValue ? new Date(effectiveEndValue) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '';

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 0) months = 0;

  const yearsPart = Math.floor(months / 12);
  const monthsPart = months % 12;

  const parts = [];
  if (yearsPart > 0) parts.push(`${yearsPart} yr${yearsPart > 1 ? 's' : ''}`);
  if (monthsPart > 0) parts.push(`${monthsPart} mo${monthsPart > 1 ? 's' : ''}`);
  if (!parts.length) return '< 1 mo';
  return parts.join(' ');
};

const sortByStartDateDesc = (items, key = 'start_date') => {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const aDate = a?.[key] ? new Date(a[key]) : null;
    const bDate = b?.[key] ? new Date(b[key]) : null;
    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;
    return bDate - aDate;
  });
};

const splitSkills = (value) => {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const getExternalUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();

  // If it already looks like an absolute URL, use it as-is
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Fallback: assume it's a bare domain or path and prefix with https
  // (never prefix with localhost or current origin)
  return `https://${trimmed.replace(/^\/+/, '')}`;
};

const EducationSection = () => {
  const { data: educationRaw } = useSWR('/education', fetcher);
  const { data: experienceRaw } = useSWR('/experience', fetcher);
  const { data: awards } = useSWR('/awards', fetcher);
  const { data: certificates } = useSWR('/certificates', fetcher);

  const education = sortByStartDateDesc(educationRaw);
  const experience = sortByStartDateDesc(experienceRaw);
  const achievements = [...(awards || []).map((item) => ({ ...item, _type: 'award' })), ...(certificates || []).map((item) => ({ ...item, _type: 'certificate' }))].sort((a, b) => {
    const aDate = a?.issued_on ? new Date(a.issued_on) : null;
    const bDate = b?.issued_on ? new Date(b.issued_on) : null;
    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;
    return bDate - aDate;
  });

  return (
    <section id="education" className="section">
      <div className="section-bar" data-aos="fade-down">Experience, Education & Achievements</div>

      <div className="education-columns">
        <div className="education-column" data-aos="fade-right">
          <h2 className="education-title">Experience</h2>
          <div className="education-list">
            {experience?.map((exp, index) => (
              <div
                key={exp.id}
                className="card edu-card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <h3>{exp.company}</h3>
                <p className="edu-degree">{exp.title}</p>
                <p className="edu-dates">
                  {formatMonthYear(exp.start_date)} -
                  {getEffectiveEndDate(exp.end_date)
                    ? ` ${formatMonthYear(getEffectiveEndDate(exp.end_date))}`
                    : ' Present'}
                  {exp.start_date && (
                    <span className="edu-duration"> · {formatDuration(exp.start_date, exp.end_date)}</span>
                  )}
                </p>
                {exp.description && <p className="edu-desc">{exp.description}</p>}
                {splitSkills(exp.skills).length > 0 && (
                  <div className="project-tech-list">
                    {splitSkills(exp.skills).map((skill) => (
                      <span key={skill} className="project-tech-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="education-column" data-aos="fade-left">
          <h2 className="education-title">Education</h2>
          <div className="education-list">
            {education?.map((edu, index) => (
              <div
                key={edu.id}
                className="card edu-card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <h3>{edu.institution}</h3>
                <p className="edu-degree">{edu.degree}</p>
                {edu.field && <p className="edu-field">{edu.field}</p>}
                <p className="edu-dates">
                  {formatMonthYear(edu.start_date)} -
                  {getEffectiveEndDate(edu.end_date)
                    ? ` ${formatMonthYear(getEffectiveEndDate(edu.end_date))}`
                    : ' Present'}
                  {edu.start_date && (
                    <span className="edu-duration"> · {formatDuration(edu.start_date, edu.end_date)}</span>
                  )}
                </p>
                {edu.description && <p className="edu-desc">{edu.description}</p>}
                {splitSkills(edu.skills).length > 0 && (
                  <div className="project-tech-list">
                    {splitSkills(edu.skills).map((skill) => (
                      <span key={skill} className="project-tech-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="education-columns" style={{ marginTop: '24px' }}>
        <div className="education-column" data-aos="fade-up">
          <h2 className="education-title">Certifications &amp; Awards</h2>
          <div className="education-list">
            {achievements?.map((item, index) => (
              <div
                key={`${item._type}-${item.id}`}
                className="card edu-card"
                data-aos="zoom-in-up"
                data-aos-delay={index * 80}
              >
                <h3>{item.title}</h3>
                {item.issuer && <p className="edu-degree">{item.issuer}</p>}
                {item.issued_on && (
                  <p className="edu-dates">Issued: {formatMonthYear(item.issued_on)}</p>
                )}
                {item._type === 'certificate' && item.credential_id && (
                  <p className="edu-desc">ID: {item.credential_id}</p>
                )}
                {item._type === 'certificate' && item.credential_url && (
                  <p className="edu-desc">
                    <a href={getExternalUrl(item.credential_url)} target="_blank" rel="noreferrer">
                      View credential
                    </a>
                  </p>
                )}
                {item.description && <p className="edu-desc">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
