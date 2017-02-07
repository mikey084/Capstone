
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert({imageurl: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p160x160/1545072_10153744860430623_1596799000_n.jpg?oh=23ca5457896c87c7b4411c9d694ed5d5&oe=593AE8B5',  name: 'Mikey', occupation: 'Web Development Student', title: 'Galvanize Delivers', description: "I am a galvanize student recently attended 6 month web immersive program.", address: "145 van ness Blvd San Francisco 95612 "}),
        knex('events').insert({imageurl: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p160x160/12650976_10153585312523411_1211338731892105079_n.jpg?oh=e4dbd610bce6fb928a4c2690e318622c&oe=593C69EC', name: 'Joey', occupation: 'IOS Engineer Linkedin', title: 'Linkedin Apprenticeship', description: "I am a software engineer at Linkedin working on Mobile application development looking to increase knowledge of apprenticeship program", address: "1650 hollywood drive Los Angeles 99240"}),
        knex('events').insert({imageurl: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/1382168_10153950620813336_1776196728747549198_n.jpg?oh=91db5584f615db7c76b715910d3796a6&oe=5911EE6A', name: 'Jonny', occupation: 'Program Coordinator at Apple Inc.', title: 'Recruiting manager', description: "I am a recruiter at Apple looking to broaden public knowledge of interview process and job eligibility.", address: "1760 Wilshire Blvd Los Angeles 99138"}),

      ]);
    });
};
