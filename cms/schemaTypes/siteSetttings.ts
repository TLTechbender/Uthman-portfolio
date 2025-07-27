import {defineType, defineField} from 'sanity'

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'navbar',
      title: 'Navigation Bar (just stuff for your navbar)',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'image',
          description: 'Upload your brand logo for the navbar',
          options: {
            hotspot: true, // Enables image cropping
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Describe the logo for accessibility',
              validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
            }),
          ],
          validation: (Rule) => Rule.required().error('Logo is required'),
        }),

        defineField({
          name: 'contact',
          title: 'Contact Us Link',
          type: 'url',
          description: 'Full URL for contact purposes (e.g., https://a-contact-link-abeg)',
          validation: (Rule) =>
            Rule.required()
              .uri({
                scheme: ['http', 'https'],
              })
              .error('Please enter a valid full URL starting with http:// or https://'),
        }),
      ],
    }),

    // Footer Section
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'socialLinks',
          title: 'Social Media Links that you want to show in the footer',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Twitter/X', value: 'twitter'},
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'Behance', value: 'behance'},
                      {title: 'Dribbble', value: 'dribbble'},
                      {title: 'LinkedIn', value: 'linkedin'},
                      {title: 'GitHub', value: 'github'},
                      {title: 'YouTube', value: 'youtube'},
                      {title: 'TikTok', value: 'tiktok'},
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'Discord', value: 'discord'},
                      {title: 'Twitch', value: 'twitch'},
                      {title: 'Pinterest', value: 'pinterest'},
                    ],
                    layout: 'dropdown',
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  description: 'Full URL to your profile (e.g., https://twitter.com/username)',
                  validation: (Rule) =>
                    Rule.required()
                      .uri({
                        scheme: ['http', 'https'],
                      })
                      .error('Please enter a valid full URL starting with http:// or https://'),
                }),
                defineField({
                  name: 'isEnabled',
                  title: 'Enable Link',
                  type: 'boolean',
                  description: 'Toggle to show/hide this social link',
                  initialValue: true,
                }),
              ],
              preview: {
                select: {
                  platform: 'platform',
                  url: 'url',
                  isEnabled: 'isEnabled',
                },
                prepare({platform, url, isEnabled}) {
                  const platformTitle =
                    platform?.charAt(0).toUpperCase() + platform?.slice(1) || 'Unknown'
                  const status = isEnabled ? '🟢' : '🔴'
                  return {
                    title: `${status} ${platformTitle}`,
                    subtitle: url,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).error('At least one social link is recommended'),
        }),
      ],
    }),
  ],

  // Document-level preview
  preview: {
    prepare() {
      return {
        title: 'Site Configuration',
        subtitle: 'Navbar & Footer Settings',
      }
    },
  },
})

export default siteSettings
