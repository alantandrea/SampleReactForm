#!/bin/bash


npm run build
aws s3 sync /Users/alanandrea/dev/forms/client/build   s3://forms-sample



