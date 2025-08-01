import {defineType, defineField} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Page Title',
          type: 'string',
          description: 'Title that appears in browser tabs and search results',
          validation: (Rule) =>
            Rule.required().max(60).warning('Keep under 60 characters for best SEO'),
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines and social media previews',
          validation: (Rule) =>
            Rule.required().max(160).warning('Keep under 160 characters for best SEO'),
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Media Preview Image',
          type: 'image',
          description:
            'Image shown when page is shared on social media (1200x630px recommended size for sexiness)',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description:
            'Keywords relevant to your homepage e.g., "portfolio", "UX designer", "Talented Designer" (just things human beings would think of when searching for a UI/UX designer)',
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'The preferred URL for this page (usually your domain)',
        }),
        defineField({
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Your Twitter username (without @)',
        }),
        defineField({
          name: 'linkedInHandle',
          title: 'LinkedIn Handle',
          type: 'string',
          description: 'Your LinkedIn username (without the domain)',
        }),
        defineField({
          name: 'behanceHandle',
          title: 'Behance Handle',
          type: 'string',
          description: 'Your Behance username (without the domain)',
        }),
        defineField({
          name: 'instagramHandle',
          title: 'Instagram Handle',
          type: 'string',
          description: 'Your Instagram username (without the @)',
        }),
      ],
    }),
    defineField({
      name: 'pageHeading',
      title: 'Page Heading',
      type: 'string',
      description: 'Main heading for the about page',
      validation: (Rule) =>
        Rule.required().max(100).warning('Keep heading concise for better impact'),
    }),

    // 2. Sub Heading (Rich Text)
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
              {
                title: 'Highlight',
                name: 'highlight',
                type: 'object',
                fields: [
                  {
                    title: 'Highlight Color',
                    name: 'color',
                    type: 'string',
                    options: {
                      list: [
                        {title: 'Yellow', value: 'yellow'},
                        {title: 'Green', value: 'green'},
                        {title: 'Blue', value: 'blue'},
                        {title: 'Pink', value: 'pink'},
                        {title: 'Purple', value: 'purple'},
                      ],
                    },
                    initialValue: 'yellow',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Write your heart out!',
      validation: (Rule) => Rule.required().min(1).error('Sub heading content is required'),
    }),

    // 3. Number of Projects
    defineField({
      name: 'projectsCount',
      title: 'Number of Projects',
      type: 'number',
      description: 'Total number of projects completed',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .max(9999)
          .error('Please enter a valid number of projects'),
      initialValue: 0,
    }),

    // 4. Number of Happy Clients
    defineField({
      name: 'clientsCount',
      title: 'Number of Happy Clients',
      type: 'number',
      description: 'Total number of satisfied clients',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .max(9999)
          .error('Please enter a valid number of clients'),
      initialValue: 0,
    }),

    // 5. Contact Link
    defineField({
      name: 'contactLink',
      title: 'Hit Me Up Link',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'Text that appears on the contact button',
          initialValue: 'Hit Me Up!',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Contact URL',
          type: 'url',
          description: 'WhatsApp, Calendly, or any HTTPS link where people can reach you',
          validation: (Rule) =>
            Rule.required()
              .uri({scheme: ['https']})
              .error('URL must start with https://'),
        }),
        defineField({
          name: 'description',
          title: 'Link Description',
          type: 'string',
          description:
            'Optional: Brief description of what happens when they click (e.g., "Book a 30-min call")',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // 6. Gallery Images (Array of exactly 3)
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO',
              validation: (Rule) => Rule.required().max(120),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (Optional)',
              type: 'string',
              description: 'Optional caption or context for the image',
            }),
            defineField({
              name: 'priority',
              title: 'Loading Priority',
              type: 'string',
              options: {
                list: [
                  {title: 'High (loads first)', value: 'high'},
                  {title: 'Normal', value: 'normal'},
                  {title: 'Low (lazy load)', value: 'low'},
                ],
                layout: 'radio',
              },
              initialValue: 'normal',
              description: 'Controls how quickly this image loads',
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'caption',
              media: 'image',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Untitled Image',
                subtitle: subtitle || 'No caption',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().length(3).error('You must add exactly 3 images for the gallery'),
      description: 'Add exactly 3 of your best images to beautify the page',
    }),

    defineField({
      name: 'bottomQuote',
      title: 'The quote at the bottom of the page',
      type: 'string',
      description: 'Just one Fine ass quote which you may or may not decide to include bro',
    }),
  ],

  // Document-level settings
  preview: {
    select: {
      title: 'pageHeading',
      projectsCount: 'projectsCount',
      clientsCount: 'clientsCount',
      media: 'galleryImages.0.image',
    },
    prepare({title, projectsCount, clientsCount, media}) {
      const stats = `${projectsCount || 0} projects • ${clientsCount || 0} clients`
      return {
        title: title || 'About Page',
        subtitle: stats,
        media,
      }
    },
  },
})

export default aboutPage
