<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>XML Sitemap</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 2rem; color: #111; }
          h1 { font-size: 1.25rem; }
          table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
          th, td { border: 1px solid #ddd; padding: 0.5rem 0.75rem; text-align: left; }
          th { background: #f5f5f5; }
          a { color: #0b57d0; }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <p>This file lists indexable URLs for search engines. Humans can use this table for a quick overview.</p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last modified</th>
              <th>Change frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td><xsl:value-of select="s:lastmod"/></td>
                <td><xsl:value-of select="s:changefreq"/></td>
                <td><xsl:value-of select="s:priority"/></td>
              </tr>
            </xsl:for-each>
            <xsl:for-each select="s:sitemapindex/s:sitemap">
              <tr>
                <td colspan="4"><a href="{s:loc}"><xsl:value-of select="s:loc"/></a> (sitemap index child)</td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
