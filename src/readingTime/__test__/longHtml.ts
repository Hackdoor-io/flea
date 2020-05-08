export default `
<div data-v-53699baa="" class="container"><div data-v-53699baa="" class="article-subtitle"><p data-v-53699baa="" class="is-size-4">Integrating ReasonML to an existing TypeScript/Flow codebase may sound difficult... but it's actually easier than you think!</p> </div> <div data-v-53699baa=""><div id="hck-article-body" class="hck-article-body "><div><h2>A bit of context</h2>
<p>I've recently started to work on a component library that implements some design system specifications.<br>
It will make it easier to create more complex user interfaces and website features maintaining consistency between pages look &amp; feel, user experience and brand style in general on a product that I'm working on.</p>
<p>We've opted for building it using React, styled-components and TypeScript so that every component will be easier to abstract, develop and test.<br>
We also want to handle multiple UI themes (dark/light) and why not, maybe support other themes in the future, and styled-components has an awesome built-in theme provider that does that exact job.</p>
<p>So, let's see how a simple button would be implemented using these technologies:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> styled <span class="hljs-keyword">from</span> <span class="hljs-string">"styled-components"</span>;
<span class="hljs-keyword">import</span> { theme } <span class="hljs-keyword">from</span> <span class="hljs-string">"./types.d"</span>;

<span class="hljs-keyword">type</span> ButtonProps = {
  color?:    <span class="hljs-string">"primary"</span> | <span class="hljs-string">"red"</span> | <span class="hljs-string">"yellow"</span> | <span class="hljs-string">"white"</span>;
  size?:     <span class="hljs-string">"small"</span> | <span class="hljs-string">"medium"</span> | <span class="hljs-string">"large"</span>;
  outlined?: <span class="hljs-built_in">boolean</span>;
  theme:     theme;
};

</code></pre>
<p>of course this is just a simplification over the actual button component, but it allow us to understand how we started to build our components.</p>
<p>So, depending on the current theme (light/dark), our button would look like this:</p>
<p><img src="http://hackdoor.imgix.net/articles/114/imgs/dark-light-buttons.jpg" alt="dark and light buttons" class="medium-zoom-image"></p>
<p>Great. Now the problem was that we needed multiple styles (outlined button, with a custom icon, different colors and so on), so we wanted to build a very abstract component:</p>
<p><img src="http://hackdoor.imgix.net/articles/114/imgs/button-styles.jpg" alt="button styles and variations" class="medium-zoom-image"></p>
<p>And we ended up with something like this:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> styled <span class="hljs-keyword">from</span> <span class="hljs-string">"styled-components"</span>;
<span class="hljs-keyword">import</span> { theme } <span class="hljs-keyword">from</span> <span class="hljs-string">"./types.d"</span>;
<span class="hljs-keyword">import</span> { getColor, getSize, getOutline } <span class="hljs-keyword">from</span> <span class="hljs-string">"./helpers"</span>;

<span class="hljs-keyword">type</span> ButtonProps = {
  color?:    <span class="hljs-string">"primary"</span> | <span class="hljs-string">"red"</span> | <span class="hljs-string">"yellow"</span> | <span class="hljs-string">"white"</span>;
  size?:     <span class="hljs-string">"small"</span> | <span class="hljs-string">"medium"</span> | <span class="hljs-string">"large"</span>;
  outlined?: <span class="hljs-built_in">boolean</span>;
  theme:     theme;
};

</code></pre>
<p>where every helper looked like this:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { theme } <span class="hljs-keyword">from</span> <span class="hljs-string">"./types.d"</span>;

<span class="hljs-keyword">type</span> ButtonProps = {
  color?:    <span class="hljs-string">"primary"</span> | <span class="hljs-string">"red"</span> | <span class="hljs-string">"yellow"</span> | <span class="hljs-string">"white"</span>;
  size?:     <span class="hljs-string">"small"</span> | <span class="hljs-string">"medium"</span> | <span class="hljs-string">"large"</span>;
  outlined?: <span class="hljs-built_in">boolean</span>;
  theme:     theme;
};

<span class="hljs-keyword">type</span> ColorTuple = [<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>];

<span class="hljs-keyword">const</span> useColors = ({ color, theme }: ButtonProps): <span class="hljs-function"><span class="hljs-params">ColorTuple</span> =&gt;</span> {
  <span class="hljs-keyword">switch</span> (color) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">"primary"</span>:
      <span class="hljs-keyword">return</span> [theme.text.primary, theme.colors.primary];
    <span class="hljs-keyword">case</span> <span class="hljs-string">"white"</span>:
      <span class="hljs-keyword">return</span> [theme.colors.dark, theme.colors.white];
    <span class="hljs-keyword">case</span> <span class="hljs-string">"red"</span>:
      <span class="hljs-keyword">return</span> [theme.colors.white, theme.colors.red];
    <span class="hljs-keyword">case</span> <span class="hljs-string">"yellow"</span>:
      <span class="hljs-keyword">return</span> [theme.colors.dark, theme.colors.yellow];
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">
  }
}

<span class="hljs-keyword">const</span> getColor = <span class="hljs-function">(<span class="hljs-params">{ color, theme }: ButtonProps</span>) =&gt;</span> {
}
</code></pre>
<p>and so on with all the other helpers (once again, I'm just semplifying things in the above example).<br>
But as you can see, here we're actually pattern-matching against a specific color, then we're extracting a "tuple" of values that can be described as follows: <code>[TextColor, BackgroundColor]</code>.</p>
<p>Doing that in TypeScript is pretty easy, as you can see, but we're implementing a pattern which is widely used in other programming languages such as Elixir, Haskell... and <strong>ReasonML</strong>!<br>
So, what if I have to pattern-match against a touple? What if I have to make more complex computations in order to generate the correct string?<br>
For a FP-junkie like me that chould be a great alternative to TypeScript, so why not?</p>
<p>So here came the idea of refactoring at least those helpers using ReasonML, maintaining the type interoperability with TypeScript.</p>
<h2>How ReasonML makes it easier</h2>
<p>First of all, we need to define our ReasonML types. Let's start with the <code>ButtonProps</code> types (we'll leave out <code>theme</code> for now):</p>
<pre><code class="language-reasonml"><span class="hljs-keyword">type</span> color =
  <span class="hljs-pattern-match">| <span class="hljs-constructor">Primary</span>
  | <span class="hljs-constructor">Red</span>
  | <span class="hljs-constructor">Yellow</span>
  | <span class="hljs-constructor">White</span>;

<span class="hljs-keyword">type</span> size =
  | <span class="hljs-constructor">Small</span>
  | <span class="hljs-constructor">Medium</span>
  | <span class="hljs-constructor">Large</span>;

<span class="hljs-keyword">type</span> outlined = <span class="hljs-built_in">bool</span>;

<span class="hljs-keyword">type</span> button<span class="hljs-constructor">Props</span> = {
  color,
  size,
  outlined
};
</span></code></pre>
<p>if we try to implement the <code>getColor</code> helper, we would end up with writing something like this:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> useColors = (color, theme) =&gt;
  switch (color) {
    | <span class="hljs-type">Primary</span> =&gt; (theme.text.primary, theme.colors.primary)
    | <span class="hljs-type">Red</span>     =&gt; (theme.colors.white, theme.colors.red)
    | <span class="hljs-type">Yellow</span>  =&gt; (theme.colors.dark,  theme.colors.yellow)
    | <span class="hljs-type">White</span>   =&gt; (theme.colors.dark,  theme.colors.white)
    | _       =&gt; (<span class="hljs-string">""</span>, <span class="hljs-string">""</span>)
  };

<span class="hljs-keyword">let</span> getColor = (color, theme) =&gt; {
  <span class="hljs-keyword">let</span> (color, background) = useColors(color, theme);
  {j|
    color:      $color;
    background: $background;
  |j}
};
</code></pre>
<p>it feels incredibly natural to write that kind of functions in ReasonML! Pattern matching is a widely used feature in functional programming languages, but there's not a stable specification yet for implementing it in the next EcmaScript versions (there's just a proposal and a Babel plugin, <a href="https://www.hackdoor.io/articles/BGJDaNkv/pattern-matching-proposal">learn more here</a>).</p>
<h2>Interoperability between ReasonML and TypeScript</h2>
<p>We've just scratched the surface of the reasons you should try Reason! (I'm not funny, I know)<br>
But now that we wrote our ReasonML function, how do we call it from TypeScript?<br>
Believe it or not, it is way easier than you think!</p>
<p>First of all, let's write down the types for our <code>theme</code>:</p>
<pre><code class="language-reasonml"><span class="hljs-keyword">type</span> textTheme = {
  primary: <span class="hljs-built_in">string</span>,
  dark: <span class="hljs-built_in">string</span>,
  white: <span class="hljs-built_in">string</span>,
};

<span class="hljs-keyword">type</span> themeColors = {
  primary: <span class="hljs-built_in">string</span>,
  dark: <span class="hljs-built_in">string</span>,
  white: <span class="hljs-built_in">string</span>,
  yellow: <span class="hljs-built_in">string</span>,
  red: <span class="hljs-built_in">string</span>,
};

<span class="hljs-keyword">type</span> theme = {
  text: textTheme,
  colors: themeColors,
};
</code></pre>
<p>Now let's rewrite our helper functions with type annotations, just to make it easier to read:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> useColors = (inputColor: color, inputTheme: theme): (<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>) =&gt;
  switch (inputColor) {
  | <span class="hljs-type">Primary</span> =&gt; (inputTheme.text.primary, inputTheme.colors.primary)
  | <span class="hljs-type">Red</span>     =&gt; (inputTheme.colors.white, inputTheme.colors.red)
  | <span class="hljs-type">Yellow</span>  =&gt; (inputTheme.colors.dark,  inputTheme.colors.yellow)
  | <span class="hljs-type">White</span>   =&gt; (inputTheme.colors.dark,  inputTheme.colors.white)
  | _       =&gt; (<span class="hljs-string">""</span>, <span class="hljs-string">""</span>)
  };
  
<span class="hljs-keyword">let</span> getColor = (color: color, theme: theme): <span class="hljs-built_in">string</span> =&gt; {
  <span class="hljs-keyword">let</span> (color, background) = useColors(color, theme);
  {j|
    color:      $color;
    background: $background;
  |j};
};
</code></pre>
<p>Awesome! Now let's add two new dependencies to our typescript codebase:</p>
<pre><code class="language-bash">yarn add -D bs-platform gentype
</code></pre>
<p>the first one is required for compiling ReasonML to JavaScript via the Bucklescript compiler, the second one is used for generating TypeScript (or even Flow) compatible types.</p>
<p>Let's add two new scripts to the <code>package.json</code> file:</p>
<pre><code class="language-json">{
...
  "start:re": "bsb -make-world &amp;&amp; react-scripts start",
  "build:re": "bsb -make-world &amp;&amp; react-scripts build"
...
}
</code></pre>
<p>great, we just need to create a new file, called <code>bsconfig.json</code> (which is similar to the Node.js' <code>package.json</code> file):</p>
<pre><code class="language-json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"my-awesome-ts-re-project"</span>,
  <span class="hljs-attr">"sources"</span>: [
    {
      <span class="hljs-attr">"dir"</span>: <span class="hljs-string">"src"</span>,
      <span class="hljs-attr">"subdirs"</span>: <span class="hljs-literal">true</span>
    }
  ],
  <span class="hljs-attr">"package-specs"</span>: [
    {
      <span class="hljs-attr">"module"</span>: <span class="hljs-string">"es6-global"</span>,
      <span class="hljs-attr">"in-source"</span>: <span class="hljs-literal">true</span>
    }
  ],
  <span class="hljs-attr">"suffix"</span>: <span class="hljs-string">".bs.js"</span>,
  <span class="hljs-attr">"namespace"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"refmt"</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">"gentypeconfig"</span>: {
    <span class="hljs-attr">"language"</span>: <span class="hljs-string">"typescript"</span>
  }
}
</code></pre>
<p>As you can see, you can specify which kind of types you should generate. In that case, we'll generate TypeScript-compatible types.<br>
There's just one thing missing; we need to specify to the BuckleScript compiler which functions should be analyzed for types generation, and that's incredibly easy to do:</p>
<pre><code class="language-ocaml">[@genType]
<span class="hljs-keyword">let</span> useColors = (inputColor, inputTheme) =&gt;
  switch (inputColor) {
  | <span class="hljs-type">Primary</span> =&gt; (inputTheme.text.primary, inputTheme.colors.primary)
  | <span class="hljs-type">Red</span>     =&gt; (inputTheme.colors.white, inputTheme.colors.red)
  | <span class="hljs-type">Yellow</span>  =&gt; (inputTheme.colors.dark,  inputTheme.colors.yellow)
  | <span class="hljs-type">White</span>   =&gt; (inputTheme.colors.dark,  inputTheme.colors.white)
  | _       =&gt; (<span class="hljs-string">""</span>, <span class="hljs-string">""</span>)
  };

[@genType]
<span class="hljs-keyword">let</span> getColor = (color: color, theme: theme): <span class="hljs-built_in">string</span> =&gt; {
  <span class="hljs-keyword">let</span> (color, background) = useColors(color, theme);
  {j|
    color:      $color;
    background: $background;
  |j};
};
</code></pre>
<p>we can do so by just adding <code>[@genType]</code> before function declaration!</p>
<p>Now we're ready for building our ReasonML functions by running <code>yarn build:re</code>.<br>
It will generate two new files in the same directory of our original <code>.re</code> file (let's say we called it <code>helper.re</code>): <code>helper.bs.js</code> and <code>helper.gen.tsx</code>.<br>
Let's see how do they look:</p>
<p><strong>helper.bs.js</strong></p>
<pre><code class="language-js"><span class="hljs-comment">// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE</span>


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useColors</span>(<span class="hljs-params">inputColor, inputTheme</span>) </span>{
  <span class="hljs-keyword">switch</span> (inputColor) {
    <span class="hljs-keyword">case</span> <span class="hljs-comment">/* Primary */</span><span class="hljs-number">0</span> :
        <span class="hljs-keyword">return</span> <span class="hljs-comment">/* tuple */</span>[
                inputTheme.text.primary,
                inputTheme.colors.primary
              ];
    <span class="hljs-keyword">case</span> <span class="hljs-comment">/* Red */</span><span class="hljs-number">1</span> :
        <span class="hljs-keyword">return</span> <span class="hljs-comment">/* tuple */</span>[
                inputTheme.colors.white,
                inputTheme.colors.red
              ];
    <span class="hljs-keyword">case</span> <span class="hljs-comment">/* Yellow */</span><span class="hljs-number">2</span> :
        <span class="hljs-keyword">return</span> <span class="hljs-comment">/* tuple */</span>[
                inputTheme.colors.dark,
                inputTheme.colors.yellow
              ];
    <span class="hljs-keyword">case</span> <span class="hljs-comment">/* White */</span><span class="hljs-number">3</span> :
        <span class="hljs-keyword">return</span> <span class="hljs-comment">/* tuple */</span>[
                inputTheme.colors.dark,
                inputTheme.colors.white
              ];
    
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getColor</span>(<span class="hljs-params">color, theme</span>) </span>{
  <span class="hljs-keyword">var</span> match = useColors(color, theme);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"\n    color:      "</span> + (<span class="hljs-built_in">String</span>(match[<span class="hljs-number">0</span>]) + (<span class="hljs-string">";\n    background: "</span> + (<span class="hljs-built_in">String</span>(match[<span class="hljs-number">1</span>]) + <span class="hljs-string">";\n  "</span>)));
}

<span class="hljs-keyword">export</span> {
  useColors ,
  getColor ,
  
}
<span class="hljs-comment">/* No side effect */</span>
</code></pre>
<p>As you can see, the BuckleScript-generated file looks incredibly similar to the original TypeScript solution we wrote in the first paragraph!</p>
<p><strong>helper.gen.tsx</strong>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* TypeScript file generated from helpers.re by genType. */</span>
<span class="hljs-comment">/* eslint-disable import/first */</span>


<span class="hljs-keyword">const</span> $$toRE841136: { [key: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">any</span> } = {<span class="hljs-string">"Primary"</span>: <span class="hljs-number">0</span>, <span class="hljs-string">"Red"</span>: <span class="hljs-number">1</span>, <span class="hljs-string">"Yellow"</span>: <span class="hljs-number">2</span>, <span class="hljs-string">"White"</span>: <span class="hljs-number">3</span>};

<span class="hljs-comment">// tslint:disable-next-line:no-var-requires</span>
<span class="hljs-keyword">const</span> Curry = <span class="hljs-built_in">require</span>(<span class="hljs-string">'bs-platform/lib/es6/curry.js'</span>);

<span class="hljs-comment">// tslint:disable-next-line:no-var-requires</span>
<span class="hljs-keyword">const</span> helpersBS = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./helpers.bs'</span>);

<span class="hljs-comment">// tslint:disable-next-line:interface-over-type-literal</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> color = <span class="hljs-string">"Primary"</span> | <span class="hljs-string">"Red"</span> | <span class="hljs-string">"Yellow"</span> | <span class="hljs-string">"White"</span>;

<span class="hljs-comment">// tslint:disable-next-line:interface-over-type-literal</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> textTheme = {
  readonly primary: <span class="hljs-built_in">string</span>; 
  readonly dark: <span class="hljs-built_in">string</span>; 
  readonly white: <span class="hljs-built_in">string</span>
};

<span class="hljs-comment">// tslint:disable-next-line:interface-over-type-literal</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> themeColors = {
  readonly primary: <span class="hljs-built_in">string</span>; 
  readonly dark: <span class="hljs-built_in">string</span>; 
  readonly white: <span class="hljs-built_in">string</span>; 
  readonly yellow: <span class="hljs-built_in">string</span>; 
  readonly red: <span class="hljs-built_in">string</span>
};

<span class="hljs-comment">// tslint:disable-next-line:interface-over-type-literal</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> theme = { readonly text: textTheme; readonly colors: themeColors };

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> useColors: <span class="hljs-function">(<span class="hljs-params">inputColor:color, inputTheme:theme</span>) =&gt;</span> [<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Arg1: <span class="hljs-built_in">any</span>, Arg2: <span class="hljs-built_in">any</span></span>) </span>{
  <span class="hljs-keyword">const</span> result = Curry._2(helpersBS.useColors, $$toRE841136[Arg1], Arg2);
  <span class="hljs-keyword">return</span> result
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getColor: <span class="hljs-function">(<span class="hljs-params">color:color, theme:theme</span>) =&gt;</span> <span class="hljs-built_in">string</span> = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Arg1: <span class="hljs-built_in">any</span>, Arg2: <span class="hljs-built_in">any</span></span>) </span>{
  <span class="hljs-keyword">const</span> result = Curry._2(helpersBS.getColor, $$toRE841136[Arg1], Arg2);
  <span class="hljs-keyword">return</span> result
};
</code></pre>
<p>this is a bit more complicated, and takes advantage of the <code>bs-platform</code> library in order to work. But as you can see, it's exposing types exactly in the same way we coded it in the first paragraph!<br>
It also automatically adds <strong>Eslint:disable</strong> comments so that it won't conflict with your Eslint configuration.</p>
<p>How awesome is that?</p>
<p>What will you build with ReasonML and TypeScript? I bet you'll do something great!</p>
</div></div></div></div>
`
