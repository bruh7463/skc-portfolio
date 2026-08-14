/* ============================================================
   scripts/wordcloud.js
   Interactive TagCloud word cloud for the Skills section
   ============================================================ */
(function () {
  'use strict';

  var built = false;

  function initWordCloud() {
    if (built) return;

    if (typeof TagCloud === 'undefined') {
      // CDN not loaded yet — retry briefly
      setTimeout(initWordCloud, 300);
      return;
    }

    var container = document.getElementById('tagcloud');
    if (!container) return;

    var texts = [
      'Java', 'Python', 'JavaScript', 'SQL', 'C',
      'React', 'Node.js', 'Express', 'Django', 'REST APIs',
      'MongoDB', 'MySQL', 'SQLite', 'CCNAv7', 'Networking',
      'Linux', 'TCP/IP', 'Troubleshooting', 'IT Hardware', 'Git',
      'GitHub', 'Microsoft Office', 'HTML', 'CSS', 'WordPress'
    ];

    TagCloud(container, texts, {
      radius: 190,
      maxSpeed: 'fast',
      initSpeed: 'fast',
      direction: 135,
      keep: true
    });

    built = true;
  }

  // Expose for main.js to call when the Skills page is shown
  window.SKCWordCloud = initWordCloud;
})();
