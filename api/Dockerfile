FROM ruby:3.0.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev node.js
RUN apt-get install -y vim

# Set timezone to Asia/Tokyo
ENV TZ='Asia/Tokyo'
  
RUN mkdir -p /myapp/api
WORKDIR /myapp/api
COPY Gemfile /myapp/api/Gemfile
COPY Gemfile.lock /myapp/api/Gemfile.lock

RUN bundle install

COPY . /myapp/api

ENV ENTRYKIT_VERSION 0.4.0
RUN wget https://github.com/progrium/entrykit/releases/download/v${ENTRYKIT_VERSION}/entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && tar -xvzf entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && rm entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && mv entrykit /bin/entrykit \
  && chmod +x /bin/entrykit \
  && entrykit --symlink

ENTRYPOINT [ \
  "prehook", "ruby -v", "--", \
  "prehook", "prehook", "--"]