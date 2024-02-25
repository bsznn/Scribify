import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/discover/AboutUs";
import Authors from "./pages/discover/Authors";
import Books from "./pages/discover/Books";
import Categories from "./pages/discover/Categories";
import FAQ from "./pages/discover/FAQ";
import Readers from "./pages/discover/Readers";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Post from "./pages/post/Post";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import PostEdit from "./pages/post/PostEdit";
import Book from "./pages/post/Book";
import Users from "./pages/login/Users";
import User from "./pages/login/User";
import Recruitement from "./pages/news/Recruitement";
import Advice from "./pages/news/Advice";
import Competition from "./pages/news/Competition";
import Archives from "./pages/explore/Archives";
import TrendingStories from "./pages/explore/TrendingStories";
import LatestAdditions from "./pages/explore/LatestAdditions";
import Newsletter from "./pages/explore/Newsletter";
import Contact from "./pages/usefulLinks/Contact";
import PrivacyPolicy from "./pages/usefulLinks/PrivacyPolicy";
import SiteMap from "./pages/usefulLinks/SiteMap";
import TermsOfUse from "./pages/usefulLinks/TermsOfUse";
import EditUser from "./pages/login/EditUser";
import ChapterUpdate from "./pages/post/ChapterUpdate";
import ChapterAdd from "./pages/post/ChapterAdd";
import AddComment from "./pages/comments/AddComment";
import Comments from "./pages/comments/Comments";
import Comment from "./pages/comments/Comment";
import UpdateComment from "./pages/comments/UpdateComment";
import ProfileUser from "./pages/profile/ProfileUser";
import Category from "./pages/categories/Category";
import UpdateCategory from "./pages/categories/UpdateCategory";
import AddCategory from "./pages/categories/AddCategory";
import NotFound from "./pages/error/NotFound";
import PrivateRoute from "./privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/a-propos" element={<AboutUs />} />

        <Route path="/auteurs" element={<Authors />} />

        <Route path="/livres" element={<Books />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categorie/:categoryId" element={<Category />} />

        <Route path="/" element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/modifier-categorie/:id" element={<UpdateCategory />} />
          <Route path="/ajouter-categorie" element={<AddCategory />} />
        </Route>

        <Route path="/faq" element={<FAQ />} />

        <Route path="/lecteurs" element={<Readers />} />

        <Route path="/livre/:id" element={<Book />} />

        <Route path="/" element={<PrivateRoute roles={["admin", "user"]} />}>
          <Route path="/ajouter-commentaire/:bookId" element={<AddComment />} />
          <Route
            path="/modifier-commentaire/:bookId/:commentId"
            element={<UpdateComment />}
          />

          <Route
            path="/modifier-chapitre/:bookId/:chapterId"
            element={<ChapterUpdate />}
          />
          <Route path="/ajouter-chapitre/:bookId" element={<ChapterAdd />} />

          <Route path="/modifier-livre/:id" element={<PostEdit />} />

          <Route path="/modifier-utilisateur/:id" element={<EditUser />} />

          <Route path="/profil" element={<Profile />} />
          <Route path="/profil/:id" element={<ProfileUser />} />
        </Route>

        <Route path="/publier" element={<Post />} />

        <Route path="/commentaires/:bookId" element={<Comments />} />
        <Route path="/commentaire/:bookId/:commentId" element={<Comment />} />

        <Route path="/se-connecter" element={<Login />} />
        <Route path="/s-inscrire" element={<Register />} />

        <Route path="/utilisateurs" element={<Users />} />
        <Route path="/utilisateur/:id" element={<User />} />

        <Route path="/recrutement" element={<Recruitement />} />
        <Route path="/conseils" element={<Advice />} />
        <Route path="/concours" element={<Competition />} />

        <Route path="/archives" element={<Archives />} />
        <Route path="/livres-populaires" element={<TrendingStories />} />
        <Route path="/livres-recents" element={<LatestAdditions />} />
        <Route path="/newsletter" element={<Newsletter />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
        <Route path="/plan-site" element={<SiteMap />} />
        <Route path="/conditions-utilisation" element={<TermsOfUse />} />
      </Routes>
    </>
  );
}

export default App;
