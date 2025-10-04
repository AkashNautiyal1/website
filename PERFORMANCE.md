# Performance Guide for akashn.in

## Image Optimization Steps
1. Use WebP or AVIF format for images (better compression, same quality)
   - Convert profile.png to WebP using a tool like squoosh.app
   - Example command: `cwebp profile.png -o profile.webp -q 80`
   
2. Create responsive images for different screen sizes
   - Example: profile-small.webp, profile-medium.webp, profile-large.webp
   - Use with picture tag:
   
```html
<picture>
  <source srcset="images/profile-small.webp" media="(max-width: 480px)" type="image/webp">
  <source srcset="images/profile-medium.webp" media="(max-width: 768px)" type="image/webp">
  <source srcset="images/profile.webp" type="image/webp">
  <img src="images/profile.png" alt="Akash Nautiyal" width="120" height="120">
</picture>
```

## Server Optimizations
1. Use HTTP/2 or HTTP/3 protocol if your hosting supports it
2. Enable Brotli compression if available (better than gzip)
3. Use a CDN for global distribution

## Additional Performance Techniques
1. Use Intersection Observer API for lazy-loading components
2. Consider using passive event listeners for scroll/touch events
3. Remove any unused CSS

## After Deployment
1. Test with Lighthouse in Chrome DevTools
2. Test with WebPageTest.org
3. Check Core Web Vitals in Google Search Console

## Performance Goals
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1