import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

// Map normalized skill names (from backend) to logo image URLs.
// Admin only needs to manage the skill name; logo is chosen automatically here.
const SKILL_ICONS = {
  // Languages
  JAVA:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  PYTHON:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  JAVASCRIPT:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  JS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  TYPESCRIPT:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  TS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  C:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  CPLUSPLUS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  CPP:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  GO:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
  GOLANG:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
  RUST:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
  DART:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  KOTLIN:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  SWIFT:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  RUBY:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',

  // Design
  FIGMA:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  FRAMER:
    'https://cdn.simpleicons.org/framer',
  FRAME:
    'https://cdn.simpleicons.org/framer',
  FRAMEFRAMER:
    'https://cdn.simpleicons.org/framer',
  ADOBEILLUSTRATOR:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
  ILLUSTRATOR:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
  ADOBEXD:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
  XD:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
  CANVA:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',

  // Web basics
  HTML:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  HTML5:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  CSS3:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  SASS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  SCSS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  BOOTSTRAP:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',

  // Tools
  GIT: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  GITHUB:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  POSTMAN:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-plain.svg',
  JIRA:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
  GITLAB:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
  BITBUCKET:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg',

  // Frameworks / libraries
  REACT:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  REACTJS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  REDUX:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  NODE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  NODEJS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  EXPRESS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  EXPRESSJS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  NEXTJS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  VUE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  VUEJS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  NUXT:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
  NUXTJS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
  ANGULAR:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
  ANGULARJS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  DJANGO:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  FLASK:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  LARAVEL:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  SPRING:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',

  // Databases
  MONGODB:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  MONGO:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  MYSQL:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  SQL:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  PHPMYADMIN:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  POSTGRES:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  POSTGRESQL:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  SQLITE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  REDIS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  MARIADB:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg',
  ORACLE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',

  // Extras (common frontend/backend tools)
  TAILWIND:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  TAILWINDCSS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  PHP:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  SUPABASE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  DOCKER:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  VSCODE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  LINUX:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  NGINX:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  FIREBASE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  AWS:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  AZURE:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  GCP:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
};

// Normalize a skill label from CMS like "Node.js", "Tailwind CSS" to a
// lookup key like "NODEJS", "TAILWINDCSS".
const normalizeSkillName = (name = '') =>
  name
    .trim()
    .replace(/[^a-z0-9]/gi, '')
    .toUpperCase();

const SkillsSection = () => {
  const { data: skills } = useSWR('/skills', fetcher);

  return (
    <section id="skills" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">Skills</div>
      <div className="skills-grid">
        {skills?.map((skill, index) => {
          const key = normalizeSkillName(skill.name || '');
          const fallbackIcon = SKILL_ICONS[key];
          const iconSrc = skill.icon_url || fallbackIcon;

          return (
            <div
              key={skill.id}
              className="card skill-item"
              data-aos="zoom-in"
              data-aos-delay={index * 60}
            >
              {iconSrc && <img src={iconSrc} alt={skill.name} />}
              <span>{skill.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
