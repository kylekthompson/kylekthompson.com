import A from '../components/typography/a';
import BlogPost, {
  Code,
  LI,
  OL,
  Paragraph,
  SubSubTitle,
  SubTitle,
  UL,
} from '../components/blog-post';
import Emphasis from '../components/typography/emphasis';
import InlineCode from '../components/typography/inline-code';
import React from 'react';
import { code } from '../models/string';

export default function ManySmallThings() {
  return (
    <BlogPost date={new Date(2019, 3, 10)} title="Many Small Things">
      <Paragraph>
        Recently at work, I&rsquo;ve had a lot of time to think about how we
        architect and design our server in a way that will scale for our current
        needs and future ventures. While doing that, I feel like I keep coming
        back to a few small, guiding ideas that I&rsquo;m planning on writing
        about. To start out the mini-series, let&rsquo;s talk about big things
        and small things.
      </Paragraph>
      <Paragraph>
        Before getting right into it, though, I thought it might be good to give
        a bit of an overview of why I&rsquo;m thinking about it at all.
      </Paragraph>

      <SubTitle id="why-is-this-important-to-me">
        Why is this important to me?
      </SubTitle>

      <Paragraph>
        At{' '}
        <A
          href="https://root.engineering/"
          target="_blank"
          rel="noopener norefferer"
        >
          Root
        </A>
        , I&rsquo;m currently an engineer on two teams: Application
        Infrastructure (not quite what it sounds like) and New Products/Product
        Variants.
      </Paragraph>
      <Paragraph>
        At first read, that doesn&rsquo;t sound entirely related, but it might
        make more sense after hearing a bit about what we do on those teams.
      </Paragraph>
      <Paragraph>
        On the Application Infrastructure team, we&rsquo;re responsible for the
        overall architectural direction of our backend and client codebases as
        well as developer productivity and the tools around that. On the New
        Products/ Product Variants team, we&rsquo;re responsible for building
        out new products or varying our existing ones (aptly named, right?) and
        making sure we can scale that while growing out both horizontally and
        vertically.
      </Paragraph>
      <Paragraph>
        Insurance is an <Emphasis>extremely</Emphasis> complex domain to work
        in, so while &ldquo;building out new products and varying existing
        ones&rdquo; might sound straight-forward, there are a ton of product and
        state specific domain requirements that we need to build out and
        maintain while we expand to every state. Given that background, it kinda
        makes sense to have a bit of overlap between those teams since there
        will naturally be architectural concerns while trying to build out
        entire new offerings or new flavors of existing ones.
      </Paragraph>
      <Paragraph>
        Like any other complex system, we need to be pretty careful about how we
        write our code to make sure new engineers can efficiently onboard and
        make meaningful contributions without understanding the entire
        application. Additionally, we need to make sure that we aren&rsquo;t
        constraining ourselves so that our longer-tenured employees feel like
        they&rsquo;re limited and unable to properly build the features they
        need to.
      </Paragraph>

      <SubTitle id="the-problem">The Problem</SubTitle>

      <Paragraph>
        In insurance, we have a lot of moving pieces. At a high level, going
        from zero to policyholder looks something like this:
      </Paragraph>
      <OL>
        <LI>Collect account information (email/password)</LI>
        <LI>
          Collect profile information (address, license numbers, VINs, etc.)
        </LI>
        <LI>Use that information to fetch reports from external services</LI>
        <LI>Record the test drive</LI>
        <LI>
          Use the profile information, reports, and driving data to figure out
          what to charge
        </LI>
        <LI>Decide on a set of coverages to get a quote</LI>
        <LI>Purchase the policy</LI>
      </OL>
      <Paragraph>
        There&rsquo;s a lot of insurance-specific stuff in there, but you can
        probably see a few pieces at least: accounts, profiles, reports, test
        drive, rating, quotes, and policies. Even ignoring the rest of our
        domain, you can see how things might get unwieldy pretty fast.
      </Paragraph>
      <Paragraph>
        An initial attempt at modeling this might look something like this:
      </Paragraph>
      <Code language="ruby" code={INITIAL_ATTEMPT} />
      <Paragraph>
        In this example, you can see below that each step in the process knows
        about the step before. Since it has that knowledge and a hard dependency
        on it, we end up with a really tall dependency graph.
      </Paragraph>
      <Code
        language="ruby"
        code={INITIAL_ATTEMPT}
        highlights={[2, 6, 11, 19, 23, 27]}
      />
      <Paragraph>
        In this example, while we do have some small things at the bottom of the
        stack (like the profile and account), we also have a really-big-thing at
        the very top of the stack.
      </Paragraph>
      <Paragraph>
        In a lot of cases, this might not be a big deal (and we definitely
        should avoid overcomplicating the code if that is the case). That being
        said, in a sufficiently complex domain like ours, you&rsquo;ll probably
        run into some problems. Off the top of my head, here are a few:
      </Paragraph>
      <UL>
        <LI>
          When one unrelated thing at the bottom changes, everything above it
          can break
        </LI>
        <LI>
          Setting up tests becomes cumbersome and slow (to create a policy,
          you&rsquo;ll need everything below it)
        </LI>
        <LI>
          Pieces at the top of the stack know about{' '}
          <Emphasis>everything</Emphasis>
        </LI>
        <LI>
          New functionality can (for the most part) only scale vertically by
          adding to the top of the stack
        </LI>
      </UL>

      <SubTitle id="what-do-you-do-instead">What do you do instead?</SubTitle>

      <Paragraph>
        The opposite! Rather than building a big and tall stack of code, we
        should try to build a lot of small pieces that we can compose together
        in a short stack.
      </Paragraph>

      <SubSubTitle id="small-things">Small things</SubSubTitle>

      <Paragraph>
        Consider the previous process of purchasing a policy. I initially
        described it as a single process&ndash; from being some anonymous person
        all the way to being a policyholder. Is that actually the case, though?
      </Paragraph>
      <Paragraph>
        Earlier, we broke out some core ideas from the become-a-policyholder
        process: profiles, reports, test drive, rates, quotes, and policies.
        When we initially talked about it, each thing built on top of each
        other.
      </Paragraph>
      <Paragraph>
        But what if they didn&rsquo;t? What if they were distinct, separate
        small pieces of functionality? The profiles piece might know how to
        store the profile information and provide that to anything that might
        need it. The reports piece might know how to run external reports and
        persist them. And so on for the other pieces.
      </Paragraph>
      <Paragraph>
        On their own, these smaller pieces are all pretty meaningless from a
        business perspective. You could almost go as far as thinking of them as
        third-party services or libraries if you wanted to.
      </Paragraph>

      <SubSubTitle id="business-processes">Business Processes</SubSubTitle>

      <Paragraph>
        By itself, the &ldquo;many small things&rdquo; idea doesn&rsquo;t{' '}
        <Emphasis>quite</Emphasis> work, though, since there isn&rsquo;t a great
        way to define a whole business process as many small things (it&rsquo;s
        a little contradictory if you think about it).
      </Paragraph>
      <Paragraph>
        At some point, we&rsquo;ll need to take these small things, put some
        business logic around them, and define a more medium-sized thing that
        provides some business value. You could imagine having multiple thin
        orchestration layers on top of those small pieces.
      </Paragraph>
      <Paragraph>
        In the earlier become-a-policyholder process, all of the logic was in
        one place and joined together. In a world of many small things with thin
        orchestration layers on top, we might have a few distinct layers that
        all live independently of one another: sign up, get a quote, collect
        driving data, and purchase a policy.
      </Paragraph>
      <Paragraph>
        Each of these pieces might rely on some parts within the other, but the
        important part to note is that they don&rsquo;t rely on everything. This
        distinction saves us from a number of the pitfalls I mentioned earlier.
      </Paragraph>
      <Paragraph>
        Because we&rsquo;ve already broken up a lot of our functionality into
        smaller pieces, these medium-sized business processes that better define
        the stages of the business can now compose those smaller pieces into
        something that provides value. And even better, if we want a new product
        variant it&rsquo;s as simple as composing those pieces in a different
        way.
      </Paragraph>

      <SubTitle id="what-does-this-look-like-in-practice">
        What does this look like in practice?
      </SubTitle>

      <Paragraph>
        At Root, we currently have two variants of car insurance. We&rsquo;ll
        call them &ldquo;drive-first&rdquo; and &ldquo;drive-later.&rdquo; They
        are more-or-less what they sound like. In drive-first, you&rsquo;ll
        download our app, sign up, take a test drive, get a quote once that is
        done, and finally purchase a policy. In drive-later, the test drive step
        is <Emphasis>after</Emphasis> you purchase the policy&ndash;
        you&rsquo;ll start out with a discount and take a thirty-day test drive
        while already a policyholder.
      </Paragraph>
      <Paragraph>
        With this alone, you might be able to spot the sticking point of our
        existing one-big-tall-thing process of becoming a policyholder:
        completing your test drive is required to get your rate, which is
        required to get a quote, which is required to purchase a policy!
        Let&rsquo;s take a look at some code, to get a better idea of how this
        looks and feels:
      </Paragraph>
      <Code language="ruby" code={ONE_BIG_THING} />
      <Paragraph>
        In this example, the <InlineCode>PolicyService</InlineCode> and{' '}
        <InlineCode>QuoteService</InlineCode> are pretty straightforward. One
        visible downside is that we&rsquo;re pretty tied to the database as
        we&rsquo;re passing in database identifiers, but otherwise the business
        logic is clear.
      </Paragraph>
      <Paragraph>
        Behind the scenes though, we will run into some difficult test setup
        here. To test purchasing a policy, we need a quote which means we need:
        a rate, driving data, reports, and a profile. The primary culprit here
        is the <InlineCode>RateService</InlineCode>.
      </Paragraph>
      <Code
        language="ruby"
        code={ONE_BIG_THING_RATE_SERVICE}
        highlights={['3-4', '6-10']}
      />
      <Paragraph>
        Since it has hard coded dependencies on a profile, the reports, and the
        driving data, we are locked into those requirements{' '}
        <Emphasis>
          anywhere that needs a <InlineCode>Rate</InlineCode>
        </Emphasis>{' '}
        since that service is <Emphasis>the thing that creates rates</Emphasis>.
      </Paragraph>
      <Paragraph>
        So the real question here is &ldquo;does having many small things solve
        these issues and allow us to support drive-later?&rdquo; I&rsquo;m
        pretty convinced that it does and that we&rsquo;ll have some pretty big
        architectural wins from this.
      </Paragraph>
      <Paragraph>
        Since code speaks at a much higher volume that my words can, let&rsquo;s
        try applying the many-small-things ideas to the examples we have so far.
        Since the <InlineCode>RateService</InlineCode> is giving us a lot of
        trouble and preventing us from building driver-later, we can start
        there.
      </Paragraph>
      <Code language="ruby" code={MANY_SMALL_THINGS_RATE_SERVICE} />
      <Paragraph>
        So, what stands out here? For one, it is clearly a lot smaller than the
        our old version. All I&rsquo;ve really done here is remove the{' '}
        <InlineCode>rate!</InlineCode> method in favor of exposing the
        previously-private methods that are doing the real work:
      </Paragraph>
      <Code
        language="ruby"
        code={ONE_BIG_THING_VS_MANY_SMALL_THINGS_RATE_SERVICE}
        highlights={[3, 12, 14, 20, 24]}
      />
      <Paragraph>
        On top of that small piece, we can build a new orchestration service to
        handle the old drive-first way:
      </Paragraph>
      <Code language="ruby" code={DRIVE_FIRST_RATE_SERVICE} />
      <Paragraph>
        Finally, we can easily build support for our driver-later variant:
      </Paragraph>
      <Code language="ruby" code={DRIVE_LATER_RATE_SERVICE} />
    </BlogPost>
  );
}

const INITIAL_ATTEMPT = code`
  class Policy < ApplicationRecord
    belongs_to :quote
  end

  class Quote < ApplicationRecord
    belongs_to :rate
    has_many :coverages
  end

  class Rate < ApplicationRecord
    belongs_to :profile
    has_many :drivers, through: :profile
    has_many :driving_data, through: :drivers
    has_many :rate_reports
    has_many :reports, through: :rate_reports
  end

  class DrivingData < ApplicationRecord
    belongs_to :driver
  end

  class Report < ApplicationRecord
    belongs_to :profile
  end

  class Profile < ApplicationRecord
    belongs_to :account
    has_many :drivers
  end
`;

const ONE_BIG_THING = code`
  module PolicyService
    def self.purchase(account:, quote:)
      pay_for!(quote: quote)
      create_policy_for!(account: account, quote: quote)
    end
  end

  module QuoteService
    def self.quote!(account:, rate:, selections:)
      verify_coverage_selections!(selections: selections)
      generate_quote_for!(
        account: account,
        rate: rate,
        selections: selections
      )
    end
  end

  module RateService
    def self.rate!(account:, profile:)
      reports = Reports.where(account: account)
      driving_data = DrivingData.where(account: account)

      rating_data = build_rating_data(
        profile: profile,
        reports: reports,
        driving_data: driving_data
      )
      premiums = calculate_premiums!(rating_data: rating_data)

      create_rate!(account: account, premiums: premiums)
    end
  end

  # etc.
`;

const ONE_BIG_THING_RATE_SERVICE = code`
  module RateService
    def self.rate!(account:, profile:)
      reports = Reports.where(account: account)
      driving_data = DrivingData.where(account: account)

      rating_data = build_rating_data(
        profile: profile,
        reports: reports,
        driving_data: driving_data
      )
      premiums = calculate_premiums!(rating_data: rating_data)

      create_rate!(account: account, premiums: premiums)
    end
  end
`;

const MANY_SMALL_THINGS_RATE_SERVICE = code`
  module RateService
    def self.calculate_premiums!(rating_data:)
      # super-secret premium calculation code here
    end

    def self.create_rate!(account:, premiums:)
      Rate.create!(account: account, premiums: premiums)
    end
  end
`;

const ONE_BIG_THING_VS_MANY_SMALL_THINGS_RATE_SERVICE = code`
# one big thing
${ONE_BIG_THING_RATE_SERVICE}

# many small things
${MANY_SMALL_THINGS_RATE_SERVICE}
`;

const DRIVE_FIRST_RATE_SERVICE = code`
  module DriveFirstRateService
    def self.rate!(account:, profile:)
      reports = Reports.where(account: account)
      driving_data = DrivingData.where(account: account)

      drive_first_rating_data = DriveFirstRatingData.from(
        profile: profile,
        reports: reports,
        driving_data: driving_data
      )
      premiums = RateService.calculate_premiums!(
        rating_data: drive_first_rating_data
      )

      RateService.create_rate!(account: account, premiums: premiums)
    end
  end
`;

const DRIVE_LATER_RATE_SERVICE = code`
  module DriveLaterRateService
    def self.rate!(account:, profile:)
      reports = Reports.where(account: account)

      drive_later_rating_data = DriveLaterRatingData.from(
        profile: profile,
        reports: reports
      )
      premiums = RateService.calculate_premiums!(
        rating_data: drive_later_rating_data
      )

      RateService.create_rate!(account: account, premiums: premiums)
    end
  end
`;
