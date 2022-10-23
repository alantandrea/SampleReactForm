#!/bin/bash


npm run build
aws s3 sync /Users/alanandrea/dev/formapp/SampleReactForm/client/build   s3://forms-sample



