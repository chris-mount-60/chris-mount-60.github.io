---
layout: single
title: "Teaching"
permalink: /teaching/
author_profile: false
portfolio_page: true
---

## Teaching philosophy

[Read my teaching philosophy.](/teaching/philosophy/)

<div class="courses-heading">
  <h2 id="courses-taught">Courses taught</h2>
  <button id="chalkboard-demo" type="button" aria-pressed="false" aria-label="Raise the figure’s arm">
    <img src="{{ '/images/teaching-chalkboard.svg' | relative_url }}" alt="" width="72" height="54">
    <img src="{{ '/images/teaching-chalkboard-raised.svg' | relative_url }}" alt="" width="72" height="54">
  </button>
</div>

### University of Arizona

*Co-instructor*

- Math 129, Calculus II — Fall 2025, Spring 2026, Fall 2026. An active-learning course taught by a faculty lecturer, a graduate instructor, and undergraduate learning assistants. I share lecturing, run in-class group work, and write homework problems and grading rubrics.
- Math 113, Elements of Calculus (online) — Summer 2025

*Instructor of record*

- Math 107, Exploring and Understanding Data — six terms, Summer 2022 to Spring 2025
- Math 112, College Algebra: Concepts and Applications — Fall 2022

*Teaching assistant*

- Math 107, Exploring and Understanding Data — Fall 2021, Spring 2022

### Jacksonville State University


- Adjunct instructor, 2019–2020: Precalculus Algebra, Finite Mathematics, Calculus and Its Applications
- Graduate teaching assistant, 2017–2019: Precalculus Algebra, Developmental Mathematics
- Graduate teaching assistant, Learning Services, summers 2018–2020: supervised undergraduate teaching assistants in a summer program for conditionally admitted students

<script>
(() => {
  const figure = document.getElementById("chalkboard-demo");
  figure.addEventListener("click", () => {
    const raised = figure.getAttribute("aria-pressed") === "true";
    figure.setAttribute("aria-pressed", String(!raised));
  });
})();
</script>
