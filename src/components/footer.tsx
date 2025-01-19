export const Footer = () => {
  return (
    <footer className="p-6 lg:fixed lg:bottom-0 lg:left-0">
      <div>
        <a className="text-white flex items-center gap-1" href="/api/rss.xml">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" fill="none" width="20" height="20" />
            <g>
              <path
                d="M14.92 18H18C18 9.32 10.82 2.25 2 2.25v3.02c7.12 0 12.92 5.71 12.92 12.73zm-5.44 0h3.08C12.56 12.27 7.82 7.6 2 7.6v3.02c2 0 3.87.77 5.29 2.16C8.7 14.17 9.48 16.03 9.48 18zm-5.35-.02c1.17 0 2.13-.93 2.13-2.09 0-1.15-.96-2.09-2.13-2.09-1.18 0-2.13.94-2.13 2.09 0 1.16.95 2.09 2.13 2.09z"
                fill="currentColor"
              />
            </g>
          </svg>
        </a>
      </div>
    </footer>
  );
};
