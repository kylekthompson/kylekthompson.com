import A from '../components/typography/a';
import BlogPost, { Code, Paragraph } from '../components/blog-post';
import React from 'react';
import { code } from '../models/string';

const YIELD_CODE = code(`
  class Thought
    attr_reader :n

    def initialize(n)
      @n = n
    end

    def blog_about
      "thought #{n}"
    end
  end

  def with_thoughts
    yield([Thought.new(1), Thought.new(2), Thought.new(3)])
  end

  with_thoughts do |thoughts|
    thoughts.each(&:blog_about)
  end
`);

export default function WelcomeToYieldThoughts() {
  return (
    <BlogPost
      date={new Date(2019, 0, 21)}
      title="Welcome to yield(thoughts)!"
    >
      <Paragraph>
        So, I&rsquo;m brand-new to the whole &ldquo;blogging&rdquo; thing, but I figured I&rsquo;d give it a go. This post is
        mostly just to serve as a placeholder so I can make sure everything looks ok before I actually get to the good
        stuff, but I might as well mention what I think I&rsquo;ll end up talking about here.
      </Paragraph>
      <Paragraph>
        At the time of writing, I am a Software Engineer at&nbsp;
        <A href="https://root.engineering/" target="_blank" rel="noopener norefferer">Root Insurance</A>. For the most
        part, we are a Ruby/JavaScript shop, so you can expect to see mostly posts in those languages (though we do
        use other languages where appropriate and I enjoy tinkering with Elixir on the side).
      </Paragraph>
      <Paragraph>
        Oh! One last thing (so I can test displaying code and in case anyone is curious)- the name of the blog comes
        from Ruby&rsquo;s yield keyword:
      </Paragraph>
      <Code language="ruby" code={YIELD_CODE} />
    </BlogPost>
  );
}
