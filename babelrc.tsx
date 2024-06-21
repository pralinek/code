{
    "presets": ["next/babel"],
    "plugins": [
      ["@emotion/babel-plugin", { "sourceMap": true, "autoLabel": "dev-only" }]
    ]
  }


  env: {
    development: {
      presets: [
        "next/babel",
        [
          require.resolve('@emotion/babel-preset-css-prop'),
          {
            sourceMap: true,
            autoLabel: true,
          },
        ],
      ],
    },
    production: {
      presets: ["next/babel", [require.resolve('@emotion/babel-preset-css-prop'), { hoist: true }]],
    },
  },