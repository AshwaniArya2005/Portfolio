const q = { query: 'query userProblemsSolved($username: String!) { matchedUser(username: $username) { username profile { ranking reputation } submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count } } } userContestRanking(username: $username) { rating } allQuestionsCount { difficulty count } }', variables: { username: 'Ashwani_Arya2005' } };
fetch('https://leetcode.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Referer': 'https://leetcode.com' },
  body: JSON.stringify(q)
}).then(r=>r.json()).then(d => console.log(JSON.stringify(d, null, 2)));
