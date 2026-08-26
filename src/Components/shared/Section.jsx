import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

/**
 * Reusable Section component with semantic <section> tag,
 * responsive container, built-in scroll reveal, and dark mode support.
 */
const Section = ({
  children,
  title,
  subtitle,
  className = "",
  containerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  maxW = "max-w-6xl",
  id,
  animate = true,
  delay = 0,
  ...props
}) => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      ref={animate ? ref : null}
      id={id}
      className={`py-16 md:py-24 transition-colors duration-200 ${
        animate ? `transition-smooth ${isVisible ? "fade-in" : "opacity-0"}` : ""
      } ${className}`}
      style={animate ? { transitionDelay: isVisible ? `${delay}ms` : "0ms" } : undefined}
      {...props}
    >
      <div className={`mx-auto px-4 ${maxW} ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2
                className={`mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl ${titleClassName}`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mx-auto max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-400 ${subtitleClassName}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
