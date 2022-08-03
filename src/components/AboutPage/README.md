# **Questions and Answers**
**Questions and Answers** is ReactJS web app where you can ask a question and have the other users answer. SoftUni Exam Project. 

**[GitHub](https://github.com/mariovyord/questions-and-answers)**

![screenshot](https://i.imgur.com/2AVjdkS.jpg)

## **App Feautures**
Users can sign up, create circles (thematic sections), ask questions, answer questions, comment and vote on answers.

### **Pages**
- Home - Answers feed, sorted by votes or by most recent.
- Questions - Questions feed. Can be sorted by circle.
- Circles - List of all main circles. User created circles can be loaded on demand. Includes option to create circle.
- Profile - Profile page includes user data, questions and answers by the given user. User can upload picture or edit personal information. Questions can be also hidden from appearing in profile.
- Question details - Includes form for adding answers and answers feed.
- Circle details - Includes asnwers feed, recent questions and edit option for owners. Can be deleted only if there are no questions posted.
- Authentication - Login and Sign up.
- About - Loads the README.md file.

## **Tech stack**
- [React](https://reactjs.org/) for UI
- [Tailwind](https://tailwindcss.com/) for CSS utility
- [daisyUI](https://daisyui.com/) for Tailwind CSS components and themes
- [Formik](https://formik.org/) for React forms, without the tears
- [React MD Editor](https://github.com/uiwjs/react-md-editor) for markdown
- [Jest](https://jestjs.io/) for testing

## **Requirements**
The app has its own dedicated REST API: 
- URL: https://questions-and-answers-rest.herokuapp.com/api
- GitHub: https://github.com/mariovyord/questions-and-answers-rest-api

### Start & watch
```
$ npm start
```
### Build for production
```
$ npm run build
```
### Configuration
You can configure REST API connection string at `/src/CONSTANTS`. By default in production it will connect to the live server and in dev mode - to local dev server.