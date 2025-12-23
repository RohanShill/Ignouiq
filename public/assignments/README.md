# Assignments Folder

Place all your assignment PDF files here.

### File Naming Convention:
- The filename should be the lowercase course code.
- Example: `begc-101.pdf` for course code `BEGC-101`.

### How to add new assignments:
1. Put the PDF file in this folder (`public/assignments/`).
2. Update the `ASSIGNMENTS_DATA` array in `src/pages/Assignments.jsx` with the details.

```javascript
// Example in src/pages/Assignments.jsx
const ASSIGNMENTS_DATA = [
    { id: 1, code: 'BEGC-101', title: 'Foundation Course in English - Assignment 1', category: 'English', year: '2024-25', isFree: true },
    // Add your new assignment here
];
```
