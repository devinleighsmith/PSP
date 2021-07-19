FROM openshift/ose-jenkins-agent-base:v4.5.0.20210621.115043

ENV NODEJS_VERSION=14 \
    NPM_CONFIG_PREFIX=$HOME/.npm-global \
    PATH=$HOME/node_modules/.bin/:$HOME/.npm-global/bin/:$PATH \
    BASH_ENV=/usr/local/bin/scl_enable \
    ENV=/usr/local/bin/scl_enable \
    PROMPT_COMMAND=". /usr/local/bin/scl_enable" \
    LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

COPY contrib/bin/scl_enable /usr/local/bin/scl_enable
COPY contrib/bin/configure-agent /usr/local/bin/configure-agent

# Install NodeJS
RUN INSTALL_PKGS="rh-nodejs${NODEJS_VERSION} rh-nodejs${NODEJS_VERSION}-nodejs-nodemon make gcc-c++" && \
    ln -s /usr/lib/node_modules/nodemon/bin/nodemon.js /usr/bin/nodemon && \
    yum install -y --setopt=tsflags=nodocs --disableplugin=subscription-manager $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    yum clean all -y

RUN chown -R 1001:0 $HOME && \
    chmod -R g+rw $HOME

USER 1001

LABEL \
    com.redhat.component="jenkins-agent-nodejs-14-rhel7-container" \
    name="openshift/ose-jenkins-agent-nodejs" \
    version="v4.5.0" \
    architecture="x86_64" \
    io.k8s.display-name="Jenkins Agent Nodejs" \
    io.k8s.description="The jenkins agent nodejs image has the nodejs tools on top of the jenkins slave base image." \
    io.openshift.tags="openshift,jenkins,agent,nodejs" \
    License="GPLv2+" \
    vendor="Red Hat" \
    io.openshift.maintainer.product="OpenShift Container Platform" \
    io.openshift.maintainer.component="Jenkins" \
    release="202106211140.p0.git.981213b" \
    io.openshift.build.commit.id="981213b424f19ebdd300d57b06b1bfa9231b5931" \
    io.openshift.build.source-location="https://github.com/openshift/jenkins" \
    io.openshift.build.commit.url="https://github.com/openshift/jenkins/commit/981213b424f19ebdd300d57b06b1bfa9231b5931"
