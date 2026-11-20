---
layout: single
title: "Teaching"
permalink: /teaching/
author_profile: false
portfolio_page: true
square_series: true
---

## Teaching philosophy

I like to build a lesson around a question that gives students a reason to do the mathematics. How far out to sea can you see from the beach? Students can get surprisingly far with a sketch of the Earth and a Taylor series. After a lesson, I compare the work students did in class with their solutions to related exam problems. Where the same difficulty shows up twice, I revise the lesson.

## Courses taught

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
  const stacks = document.querySelectorAll(".square-series");
  const status = document.getElementById("square-count");
  let side = 0.75, count = 1;
  document.getElementById("grow-squares").addEventListener("click", () => {
    side *= 2 / 3;
    count += 1;
    for (const stack of stacks) {
      const square = document.createElement("span");
      square.className = "series-term";
      square.style.width = side + "in";
      square.setAttribute("aria-hidden", "true");
      stack.appendChild(square);
    }
    status.textContent = count + " squares in each corner.";
  });
})();
</script>
