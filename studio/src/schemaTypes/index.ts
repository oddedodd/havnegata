import blockContent from './objects/blockContent'
import post from './documents/post'
import company from './documents/company'
import tilbud from './documents/tilbud'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [post, company, tilbud, blockContent]
