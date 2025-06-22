import {defineField, defineType} from 'sanity'

/**
 * Tilbud/Offer schema. Define and edit the fields for the 'tilbud' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'tilbud',
  title: 'Tilbud/Offer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Offer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Enter the price (e.g., "299 kr", "Free", "Contact for price")',
    }),
    defineField({
      name: 'image',
      title: 'Offer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{type: 'company'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Link Title',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      company: 'company.name',
      price: 'price',
      media: 'image',
    },
    prepare(selection) {
      const {company, price} = selection
      return {
        ...selection,
        subtitle: `${company}${price ? ` • ${price}` : ''}`,
      }
    },
  },
})
