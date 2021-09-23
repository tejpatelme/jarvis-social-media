export const sortPostsByDate = (posts) => {
  return posts?.slice()?.sort((a, b) => b.postedOn.localeCompare(a.postedOn));
};
