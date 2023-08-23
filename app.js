import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";




const homeStartingContent = `Welcome to our Daily Journal website, your digital sanctuary for reflection, growth, and self-expression. Embark on a journey of introspection and mindfulness as you document the moments, thoughts, and experiences that shape your life's narrative. Our platform is more than just a virtual journal; it's a companion that encourages you to pause, contemplate, and appreciate the intricacies of each day.

In a fast-paced world, taking time for yourself can often feel like a luxury. Our Daily Journal website is here to remind you that self-care is a necessity, not an indulgence. Through the art of journaling, you can capture not only the highlights but also the subtle nuances that might otherwise slip through the cracks of memory. As you weave together the threads of your daily life, you'll gain a deeper understanding of your emotions, triggers, and aspirations.

Designed with simplicity and elegance in mind, our website offers a seamless and intuitive platform for your daily entries. Whether you prefer to type away your thoughts or take a more creative approach with images and drawings, the choice is yours. The privacy of your journal is of utmost importance to us; you have full control over who gets a glimpse into your inner world.

Join a community of like-minded individuals who appreciate the therapeutic power of writing. Engage with others through shared experiences, support, and inspiration. As you read the entries of fellow journalers, you'll discover that you're not alone on this voyage of self-discovery.

Start your journey today with our Daily Journal website and make a commitment to yourself. Carve out a few moments each day to pause, reflect, and document. Your life is a story, and every day is a new page waiting to be written.`;


const aboutContent = `

At our Daily Journal website, we are passionate believers in the transformative power of introspection and self-expression. Our mission is to provide you with a sanctuary where you can embrace the art of journaling and embark on a journey of personal growth, mindfulness, and self-awareness.

We understand that life is a tapestry woven with a myriad of emotions, experiences, and thoughts. It's our belief that by capturing these moments and insights, you can unlock a deeper connection with yourself and the world around you. Our platform is designed to be your trusted companion, offering a secure and inviting space to pour your thoughts onto digital pages.

Our team is composed of individuals who have experienced firsthand the profound impact of journaling. We've harnessed our collective expertise in technology, design, and psychology to create a platform that seamlessly merges the therapeutic aspects of journaling with the convenience of modern digital tools.

Whether you're a seasoned journaler or just beginning to explore the practice, our website caters to your needs. We're committed to nurturing a vibrant community where you can connect with others who share your passion for self-discovery. Through shared stories, advice, and encouragement, you'll find a sense of camaraderie that further enriches your journaling experience.

Your privacy is of paramount importance to us. We've implemented stringent security measures to ensure that your journal remains your personal sanctuary, visible only to those you choose to share it with. Our commitment to creating a safe and judgment-free space means you can write freely, knowing that your innermost thoughts are protected.

Join us on this journey of introspection and growth. Start each day with a renewed commitment to yourself, armed with the power of words to guide you. Together, we're weaving a tapestry of stories that celebrate the beauty of the human experience. Welcome to our Daily Journal website – where every entry is a step toward a more enriched and mindful life.`;




const contactContent = `

Your thoughts and questions are important to us. Whether you're seeking assistance, have suggestions to share, or want to be part of our growing community, we're here to connect. Join the conversation through our vibrant social media presence on [Facebook](https://www.facebook.com/DailyJournalWebsite), [Twitter](https://www.twitter.com/DailyJournalWeb), and [Instagram](https://www.instagram.com/dailyjournalwebsite). For immediate support, our community forums offer a space to engage with fellow journalers. And if you're looking for quick answers, visit our Support Center on the website. We're dedicated to ensuring your experience with us is as enriching as the stories you craft within your journal.`;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const postArray = [];


app.get("/", (req, res) => {
  res.render("home.ejs", {
    homeStartingContent: homeStartingContent,
    postArray: postArray
  });
});
// home route
app.get("/home", (req, res) => {
  res.render("home.ejs", {
    homeStartingContent: homeStartingContent,
    postArray: postArray
  })
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { aboutContent: aboutContent })
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { contactContent: contactContent })
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs")

})

app.post("/compose", (req, res) => {
  const formData = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  };
  postArray.push(formData);
  res.redirect("/");

})



app.get('/posts/:postName', (req, res) => {
  const reqTitle = _.lowerCase(req.params.postName);
  let found = false;

  postArray.forEach(element => {
    const storedTitle = _.lowerCase(element.postTitle);
    if (storedTitle === reqTitle) {
      res.render("post.ejs", { stored: element.postTitle, storedBody: element.postBody });
      found = true;
    }
  });

  if (!found) {
    res.render("post.ejs", { stored: "Blog not found" });
  }
});















app.listen(3000, function () {
  console.log("Server started on port 3000");
});
