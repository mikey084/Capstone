
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert({id: 1, name: 'Mikey', occupation: 'Web Development Student', title: 'Galvanize Delivers', description: "I am a galvanize student recently attended 6 month web immersive program.", address: "145 van ness Blvd San Francisco 95612 "}),
        knex('events').insert({id: 2, name: 'Joey', occupation: 'IOS Engineer Linkedin', title: 'Linkedin Apprenticeship', description: "I am a software engineer at Linkedin working on Mobile application development looking to increase knowledge of apprenticeship program", address: "1650 hollywood drive Los Angeles 99240"}),
        knex('events').insert({id: 3, name: 'Jonny', occupation: 'Program Coordinator at Apple Inc.', title: 'Recruiting manager', description: "I am a recruiter at Apple looking to broaden public knowledge of interview process and job eligibility.", address: "1760 Wilshire Blvd Los Angeles 99138"}),

      ]);
    });
};
