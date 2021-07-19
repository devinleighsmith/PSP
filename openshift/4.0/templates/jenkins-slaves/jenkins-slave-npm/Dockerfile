FROM registry.redhat.io/openshift4/ose-jenkins-agent-base

# Labels consumed by Red Hat build service

ENV NODEJS_VERSION=14 \
    NPM_CONFIG_PREFIX=$HOME/.npm-global \
    PATH=$HOME/node_modules/.bin/:$HOME/.npm-global/bin/:$PATH \
    LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

# Install NodeJS
RUN INSTALL_PKGS="nodejs nodejs-nodemon make gcc-c++" && \
    yum module enable -y nodejs:${NODEJS_VERSION} && \
    yum install -y --setopt=tsflags=nodocs --disableplugin=subscription-manager $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    yum clean all -y

RUN chown -R 1001:0 $HOME && \
    chmod -R g+rw $HOME

USER 1001

LABEL \
    com.redhat.component="ose-jenkins-agent-nodejs-14-container" \
    name="openshift/ose-jenkins-agent-nodejs" \
    architecture="x86_64" \
    io.k8s.display-name="Jenkins Agent Nodejs" \
    io.k8s.description="The jenkins agent nodejs image has the nodejs tools on top of the jenkins agent base image." \
    io.openshift.tags="openshift,jenkins,agent,nodejs" \
    maintainer="openshift-dev-services+jenkins@redhat.com" \
    License="GPLv2+" \
    vendor="Red Hat" \
    io.openshift.maintainer.product="OpenShift Container Platform" \
    io.openshift.maintainer.component="Jenkins" \
    release="202106252127.p0.git.d3eacc2" \
    io.openshift.build.commit.id="d3eacc24156ef726caae230b9b4620059a76f781" \
    io.openshift.build.source-location="https://github.com/openshift/jenkins" \
    io.openshift.build.commit.url="https://github.com/openshift/jenkins/commit/d3eacc24156ef726caae230b9b4620059a76f781" \
    version="v4.7.0"
