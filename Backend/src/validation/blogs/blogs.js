import Joi from "joi";

const verifyBlog = Joi.object({
  title: Joi.string().min(10).max(80).trim().required().messages({
    "string.empty": `"Blog title" is a required field.`,
  }),
  description: Joi.string().min(120).max(1500).trim().required().messages({
    "string.empty": `"Blog description" is a required field.`,
    "string.length": `"Blog description" must have 120 words and maximum upto 1500 words`,
  }),
  category: Joi.string().min(1).max(30).required().messages({
    "string.empty": `"category id" is a required field.`,
  }),
});

const likes = Joi.object({
  blog_id: Joi.number().min(1).required().messages({
    "number.empty": `"Blog id" is a required field.`,
  }),
  like: Joi.number().valid(1, -1).required().messages({
    "number.empty": `"like" is a required field.`,
  }),
});

const dislikes = Joi.object({
  blog_id: Joi.number().min(1).required().messages({
    "number.empty": `"Blog id" is a required field.`,
  }),
  dislike: Joi.number().valid(1, -1).required().messages({
    "number.empty": `"dislike" is a required field.`,
  }),
});

const fetchBlogsCategory = Joi.object({
  offset: Joi.number().min(0).required().messages({
    "number.empty":`"offset" is a required field.`
  }),
  category: Joi.string().required().messages({
    "string.empty":`"category" is a required field.`
  })
})

const fetchBlog = Joi.object({
  offset: Joi.number().min(0).required().messages({
    "number.empty":`"offset" is a required field.`
  }),
})

const deleteBlog = Joi.object({
  blog_id: Joi.number().min(1).required().messages({
    "number.empty": `"Blog id" is a required field.`,
  })
})

const fetchBlogsUser = Joi.object({
  username: Joi.string().min(4).max(20).required().messages({
    "string.empty": `"username" is a required field.`,
    "string.length": `"username" must be between 4 to 20 character long.`,
  }),
  offset: Joi.number().min(0).required().messages({
    "number.empty":`"offset" is a required field.`
  })
})

export default {
  verifyBlog,
  likes,
  dislikes,
  fetchBlogsCategory,
  fetchBlog,
  deleteBlog,
  fetchBlogsUser
};
