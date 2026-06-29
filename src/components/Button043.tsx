const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="button-043__icon"
  >
    <path
      d="M10.685 3.42h3.776l7.862 8.583-7.862 8.583h-3.776l7.083-7.193h-16.1v-2.748H17.8L10.685 3.42Z"
      fill="currentColor"
    />
  </svg>
);

interface Button043Props {
  href: string;
  label: string;
  className?: string;
  long?: boolean;
  target?: string;
  rel?: string;
}

export default function Button043({
  href,
  label,
  className = "",
  long = false,
  target,
  rel,
}: Button043Props) {
  return (
    <a
      data-button-043=""
      href={href}
      target={target}
      rel={rel}
      className={`button-043${long ? " button-043--long" : ""} ${className}`.trim()}
    >
      <span className="button-043__bg">
        <span className="button-043__bg-hover" />
      </span>
      <span className="button-043__inner">
        <span className="button-043__mask">
          <span className="button-043__text">{label}</span>
        </span>
        <span className="button-043__icon-wrap">
          <span className="button-043__icon-bg" />
          <span className="button-043__icon-mask">
            <span className="button-043__icon-list">
              <ArrowIcon />
              <ArrowIcon />
              <ArrowIcon />
            </span>
          </span>
        </span>
      </span>
    </a>
  );
}
