# react-demo

```
# 定义 stages
stages:
  - build
  - test

# 定义 job
job1:
  stage: test
  script:
    - echo "I am job1"
    - echo "I am in test stage"

# 定义 job
job2:
  stage: build
  script:
    - echo "I am job2"
    - echo "I am in build stage"
```

