import {defineType, defineField} from 'sanity'

const portfolioPage = defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  icon: () => '💼',
  fields: [
    // 1. SEO Settings
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

    // 2. Portfolio Projects Array
    defineField({
      name: 'portfolioProjects',
      title: 'Portfolio Projects',
      type: 'array',
      description: 'LFG!!! Designer wey get evidence yapa!!!!',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'projectName',
              title: 'Project Name',
              type: 'string',
              description: 'Name of the project',
              validation: (Rule) => Rule.required().max(80).warning('Keep project names concise'),
            }),
            defineField({
              name: 'shortDescription',
              title: 'Short Description',
              type: 'text',
              rows: 3,
              description:
                'Brief description of the project and your role (remember to keep it short!! I mean it cos I hid overflows so anything you see is down to you bro, lol, nha only 350 characters grace I give una)',
              validation: (Rule) =>
                Rule.required()
                  .max(350)
                  .warning('Keep descriptions under 200 characters for better readability'),
            }),
            defineField({
              name: 'projectLink',
              title: 'Project Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Link Text',
                  type: 'string',
                  description:
                    'Text displayed on the button/link (e.g., "View Project", "Live Site", "Case Study")',
                  validation: (Rule) => Rule.required().max(30),
                  initialValue: 'View Project',
                }),
                defineField({
                  name: 'url',
                  title: 'Project URL',
                  type: 'url',
                  description: 'Link to live project, case study, or GitHub repo',
                  validation: (Rule) =>
                    Rule.required()
                      .uri({scheme: ['https']})
                      .error('URL must start with https://'),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'projectImage',
              title: 'Project Image',
              type: 'image',
              description: 'High-quality image showcasing the project (crucial for visual impact!)',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'],
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describe the project image for accessibility and SEO',
                  validation: (Rule) => Rule.required().max(120),
                }),
                defineField({
                  name: 'caption',
                  title: 'Image Caption (Optional)',
                  type: 'string',
                  description:
                    'Optional caption or additional context (note that this does not get rendered bro, so have fun)',
                }),
              ],
              validation: (Rule) =>
                Rule.required().error(
                  'Project image is required - this is crucial for visual impact!',
                ),
            }),
          ],
          preview: {
            select: {
              title: 'projectName',
              subtitle: 'shortDescription',
              media: 'projectImage',
              isFeatured: 'isFeatured',
              projectType: 'projectType',
            },
            prepare({title, subtitle, media, isFeatured, projectType}) {
              const featuredIcon = isFeatured ? '⭐ ' : ''
              const typeLabel = projectType ? ` • ${projectType}` : ''
              return {
                title: `${featuredIcon}${title}`,
                subtitle: `${subtitle?.slice(0, 60)}${subtitle?.length > 60 ? '...' : ''}${typeLabel}`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one portfolio project is required'),
    }),
  ],

  preview: {
    select: {
      seoTitle: 'seo.title',
      // portfolioProjects: 'portfolioProjects',
      firstProjectImage: 'portfolioProjects.0.projectImage',
    },
    prepare({seoTitle, firstProjectImage}) {
      // This approach works but might be slower for documents with many projects
      // const projectCount = Array.isArray(portfolioProjects) ? portfolioProjects.length : 0

      return {
        title: seoTitle || 'Portfolio Page',

        media: firstProjectImage,
      }
    },
  },
})

export default portfolioPage
