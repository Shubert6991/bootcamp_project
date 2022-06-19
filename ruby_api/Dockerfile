FROM ruby:2.7.2

ENV DATABASE_NAME=bootcamp_ruby_development
ENV DATABASE_USERNAME=bootcamp_ruby
ENV DATABASE_PASSWORD=bootcamp_ruby
ENV DATABASE_HOST=127.0.0.1
ENV DATABASE_PORT=5432

RUN mkdir /app
WORKDIR /app

EXPOSE 3000

COPY Gemfile .
COPY Gemfile.lock .
RUN gem update bundler
RUN bundle install

CMD ["rails", "s", "-b", "0.0.0.0"]