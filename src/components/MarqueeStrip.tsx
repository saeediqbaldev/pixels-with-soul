const MarqueeStrip = () => {
  const items = [
    "WordPress Expert",
    "React JS Developer",
    "E-Commerce Specialist",
    "UI/UX Designer",
    "Figma Pro",
    "Shopify Developer",
    "Website Maintenance",
    "SEO Optimization",
  ];

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-8">
        <span className="text-2xl md:text-3xl font-display font-bold text-heading uppercase tracking-wider">
          {item}
        </span>
        <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
      </span>
    ));

  return (
    <div className="py-8 border-y border-border overflow-hidden">
      <div className="marquee-strip">
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
};

export default MarqueeStrip;
