<h2>Motivation</h2>
React game using class component (no routing , no ajax). Mostly get a feeling of tiny react app


<h2>Spec</h2>
<h3>Basic</h3>
<ul>
  <li>rand 10 numbers integer between 1,20</li>
  <li>show numbers on the dom on a row . appears on component mount</li>
  <li>start clock</li>
  <li>click all even numbers and mark per click (greyed ? disabled ?)</li>
  <li>show elapsed second and 'Game Over' after success</li>
</ul>

<h3>Advanced</h3>
<ul>
  <li> click odd number will punish by adding 1 sec to the elapsed seconds</li>
  <li> put elapsed seconds in history (local storage)</li>
  <li> show history</li>
  <li> show items in two rows</li>
  <li> start button</li>
  <li> display elapsed seconds and 'Game Over' in Message component</li>
  <li> display each number in Item component</li>
</ul>

<h2>Design</h2>
<ul>
  <li>state</li>
  <li>props</li>
  <li>components</li>
</ul>


<h2>Open issues</h2>
<ul>
  <li>the seconds written to the local storage are smaller by one from the seconds that appears on the dom</li>
</ul>
