module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  async additionalPaths() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/sitemap?API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const data = await response.json();
    const { taxis } = data.data;

    return taxis.map((taxi) => ({
      loc: `/${taxi._id}`,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};
