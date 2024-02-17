import {API_BASE_URL} from "../constants"

export const getAllPosts = async () => {
  const response = await fetch(API_BASE_URL,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `
          query IndexPage {
            posts(where: {orderby: {field: DATE, order: DESC}}) {
              nodes {
                slug
                date
                title
                excerpt
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        `
      }),
    });
  
    // destructure data from our JSON
    const { data } = await response.json();
  
    //  assign the array of nodes to "posts" variable for usability
    return data.posts.nodes
}


export const getSinglePostBySlug = async (slug) => {
  const response = await fetch(API_BASE_URL,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `
        query SinglePost($id: ID = "${slug}") {
          post(idType: SLUG, id: $id) {
            date
            content
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
        `
      }),
    });

    // destructure data from our JSON
    const { data } = await response.json();

    return data.post
}

export const getAllPostSlugs = async () => {
  const response = await fetch(API_BASE_URL,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `
        query AllSlugs {
          posts {
            nodes {
              slug
            }
          }
        }
        `
      }),
    });

  // destructure data from our JSON
  const { data } = await response.json();

  //  assign the array of nodes to "posts" variable for usability
  return data.posts.nodes
}


export const getAllTags = async () => {
  const response = await fetch(API_BASE_URL,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `
          query AllTags {
            tags {
              nodes {
                name
                slug
              }
            }
          }
        `
      }),
    });
  
  
    // destructure data from our JSON
    const { data } = await response.json();
  
    //  assign the array of nodes to "posts" variable for usability
    return data.tags.nodes
}

export const getPostsByTag = async (tag) => {
  const response = await fetch(API_BASE_URL,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `
          query SingleTag($id: ID = "${tag}") {
            tag(idType: SLUG, id: $id) {
              posts(where: {orderby: {field: DATE, order: DESC}}) {
                nodes {
                  date
                  content
                  title
                  slug
                  excerpt
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        `
      }),
    });
  
  // destructure data from our JSON
  const { data } = await response.json();
  
  const posts = data.tag.posts.nodes

  return posts
}