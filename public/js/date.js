function formatPostDate(createdAt) {
    const postDate = new Date(createdAt);
    const now = new Date();
    const timeDifference = now - postDate;
    const secondsAgo = Math.floor(timeDifference / 1000);
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (daysAgo < 7) {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayOfWeek = daysOfWeek[postDate.getDay()];
      return `${dayOfWeek} Last week`;
    } else {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return postDate.toLocaleDateString(undefined, options);
    }
  }