import {defineType, defineField} from 'sanity'

const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
  fields: [
    // 1. SEO Content
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

    // 2. Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'centerPieceImage',
          title: 'Center Piece Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'beforeTypewriterText',
          title: 'Text before the typewriter effect',
          type: 'string',
          description: 'Text that appears before the typewriter words (e.g., "I am a")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'typewriterWords',
          title: 'Typewriter Words',
          type: 'array',
          of: [{type: 'string'}],
          description:
            'Words that will cycle in the typewriter effect (e.g., "designer", "lazy person", "going bald")',
          validation: (Rule) => Rule.min(1).error('At least one word is required'),
        }),
        defineField({
          name: 'remainingText',
          title: 'Remaining Text',
          type: 'string',
          description: 'Text that appears after the typewriter words (e.g., "who codes in java")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subHeading',
          title: 'Sub Heading (The text under the typewriter heading)',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'hireLink',
          title:
            'Hire Me Link (Could be a link to anything sha, make e sha start with http:// or https:// or in the case of email, mailto: (This is very importantant))',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Hire Me',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto']}),
            }),
          ],
        }),
        defineField({
          name: 'cvLink',
          title: 'CV/Resume Link',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Download CV',
            }),

            defineField({
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              description:
                'Use this to point to where your cv is hosted (e.g., Google Drive, Dropbox, etc.) I decided aginst using a file upload field because I want you to be able to update your CV without having to go through the hassle of uploading it again',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
            }),
          ],
        }),
      ],
    }),

    // 3. Experiences Section
    defineField({
      name: 'experiences',
      title:
        'Work Experiences (Spam am with as many as you want, but make sure to add at least one or else una no go pass the validation), one more thing there is no validation for display order, but this is me wanting to help you in case, if you use the same number for two things and you see weird behaviour, just know say na you cause am',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'jobTitle',
              title: 'Job Title & Company',
              type: 'string',
              description: 'e.g., "UX Designer - IbadanPixels"',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'organisationLogo',
              title: 'Organisation Logo',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., "April 2023 - Present" or "2025 - 2026"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Job Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Lower numbers appear first',
              validation: (Rule) => Rule.integer().positive(),
            }),
          ],
          preview: {
            select: {
              title: 'jobTitle',
              subtitle: 'duration',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one experience is required'),
    }),

    // 4. Beyond Portfolio Section
    defineField({
      name: 'beyondPortfolio',
      title: 'Beyond Portfolio Section',
      type: 'object',
      fields: [
        // 4.1 Current Book
        defineField({
          name: 'currentBook',
          title: 'Book You are Currently Reading (As per say you be agba awo)',
          type: 'object',
          fields: [
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'string',
              description: 'Brief description or book name',
            }),
            defineField({
              name: 'bookImage',
              title: 'Book Cover Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'popupContent',
              title: 'Popup Content',
              type: 'array',
              of: [{type: 'block'}],
              description:
                'Rich content for the popup - text, emojis, images, anything! (make e no sha long, just something nice, no long talk or else nobody go read am)',
            }),
          ],
        }),

        defineField({
          name: 'techStack',
          title: 'My Tech Stack',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              initialValue: 'Here is stuff I fuck with on a daily',
            }),
            defineField({
              name: 'tools',
              title: 'Tools & Technologies',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'logo',
                      title: 'Tool Logo',
                      type: 'image',
                      options: {hotspot: true},
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'name',
                      title: 'Tool Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      media: 'logo',
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'popupContent',
              title: 'Popup Content',
              type: 'array',
              description:
                'Rich content for the popup - text, emojis, images, anything! (make e no sha long, just something nice, no long talk or else nobody go read am, I take God beg you)',
              of: [{type: 'block'}],
            }),
          ],
        }),

        // 4.3 Collaborators
        defineField({
          name: 'collaborators',
          title: 'Collaborators',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              initialValue: 'Amazing Collaborators',
            }),
            defineField({
              name: 'avatars',
              title: 'Collaborator Avatars',
              type: 'array',
              description:
                'Add as many as you want but rememeber it was only six in your design, the more you add, the more it overflows so no come tell me story later ooo',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'avatar',
                      title: 'Avatar Image',
                      type: 'image',
                      options: {hotspot: true},
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'name',
                      title: 'Name (optional)',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'alt',
                      media: 'avatar',
                    },
                  },
                },
              ],
              validation: (Rule) =>
                Rule.max(12).error(
                  'Maximum 6 collaborators allowed, (Haha, I don whine you sha add as many as you want, make e no pass 12 or it becomes visual clutter)',
                ),
            }),
            defineField({
              name: 'popupContent',
              title: 'Popup Content',
              type: 'array',
              description:
                'Rich content for the popup - text, emojis, images, anything! (make e no sha long, just something nice, no long talk or else nobody go read am)',
              of: [{type: 'block'}],
            }),
          ],
        }),

        // 4.4 My Persona
        defineField({
          name: 'persona',
          title: 'My Persona (as per say nha you dey hot)',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              initialValue: 'My Persona',
            }),
            defineField({
              name: 'personaItems',
              title: 'Persona Items',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Add personality traits, emojis, or any text that describes you',
            }),
            defineField({
              name: 'popupContent',
              title: 'Popup Content',
              type: 'array',
              description:
                'Rich content for the popup - text, emojis, images, anything! (make e no sha long, just something nice, no long talk or else nobody go read am)',
              of: [{type: 'block'}],
            }),
          ],
        }),

        // 4.5 Recent Work
        defineField({
          name: 'recentWork',
          title: 'Recent Work',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              initialValue: 'Recent Work',
            }),
            defineField({
              name: 'workImage',
              title: 'Work Preview Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'popupContent',
              title: 'Popup Content',
              description:
                'Rich content for the popup - text, emojis, images, anything! (make e no sha long, just something nice, no long talk or else nobody go read am), I sha don warn una',
              type: 'array',
              of: [{type: 'block'}],
            }),
          ],
        }),
      ],
    }),

    // 5. Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description:
        'Add testimonials from clients or colleagues (make sure to add at least one), as per designer wey dey turn up',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Testifier Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'avatar',
              title: 'Testifier Avatar',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'position',
              title: 'Position/Organization',
              type: 'string',
              description: 'e.g., "CEO of CornHub" or "Client"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'testimony',
              title: 'Testimony',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().min(10),
            }),
            defineField({
              name: 'rating',
              title: 'Star Rating',
              type: 'number',
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .max(5)
                  .integer()
                  .error('Rating must be a Positive Integer between 1 and 5'),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description:
                'Lower numbers appear first (Goal is to have sexiest ratings at the top)',
              validation: (Rule) => Rule.integer().positive(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'position',
              media: 'avatar',
              rating: 'rating',
            },
            prepare({title, subtitle, media, rating}) {
              const stars = '⭐'.repeat(rating || 0)
              return {
                title: `${title} ${stars}`,
                subtitle,
                media,
              }
            },
          },
        },
      ],
    }),
  ],

  // Document-level settings
  preview: {
    select: {
      title: 'seo.title',
    },
    prepare({title}) {
      return {
        title: title || 'Homepage',
        subtitle: 'Configure your homepage',
      }
    },
  },
})

export default homepage
