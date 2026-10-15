pipeline {
    agent any
    tools { nodejs 'node20' }
    triggers {
        pollSCM('* * * * *')
    }
    environment {
        SELENIUM_REMOTE_URL = 'http://selenium:4444/wd/hub'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test & UI E2E') {
            steps {
                sh 'npm test'
            }
        }
    }
}