## Run locally

```bash
npm install
npm run dev

## Reflection

Compared with the vanilla JavaScript version, React makes it easier to keep the interface synchronized with changing data. In assignment 4, I had to find elements, replace the information contained inside, and setup updates by hand. Here, state changes cause React to render loading, error, empty, or results view. Breaking the page into components also makes each responsibility easier to find. The harder part was deciding where state should live and how to keep asynchronous requests from updating a page after navigation.

## References

- [TVmaze API documentation](https://www.tvmaze.com/api)
- [React documentation](https://react.dev/)
- [React Router documentation](https://reactrouter.com/)
