# STAC Collection Visualizer 🌎

WebApp that allows you to view the items in the `landsat8_c2l1t1` collection, at the `https://eod-catalog-svc-prod.astraea.earth` static STAC server.

# 🧑‍💻 Tech

This application uses a number of open source projects to work properly:

- React - A JavaScript library for building user interfaces 
- [Next](https://nextjs.org/) - The React Framework for the Web
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [React Map GL](https://visgl.github.io/react-map-gl/) - Makes using Mapbox GL JS in React applications easy
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
- [Zustand](https://zustand-demo.pmnd.rs/) - Bear necessities for state management in React

## Additional Tools
- [Turf.js](https://turfjs.org/) - Advanced geospatial analysis for browsers and Node.js
- [React Tailwindcss Datepicker](https://react-tailwindcss-datepicker.vercel.app/) - A modern date range picker component for React using Tailwind 3 and dayjs
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons, made by the community.
- [React Paginate](https://github.com/AdeleD/react-paginate) - A ReactJS component that creates a pagination.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 🪄 Features

- Filter the data by select a date range and boundary box coordinates
- 2 ways to access item data in the collection:
  - Interacting with the map
  - Clicking on the item card
- Data pagination
- Route change and item selection animation
- Data persistence during the user session    

# 🖥️ Run locally
First clone this repository

Then, install all dependencies:

```bash
npm install
```

This project uses Mapbox, so to run this locally, you'll need a [Mapbox Access Token](https://docs.mapbox.com/help/getting-started/access-tokens/)

Once you have your acess token, create a `.env.local` file at the root of the project, and add:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN={YOUR ACCESS TOKEN}
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# 💡 Deployed project

Go to [stac-collection-visualizer.vercel.app/](https://stac-collection-visualizer.vercel.app/) to access an online deployed version.

