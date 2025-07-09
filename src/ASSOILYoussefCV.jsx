import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  useScrollTrigger,
  useMediaQuery,
  Paper,
  Avatar,
  Fade,
  CssBaseline,
  useTheme,
  TextField,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  School,
  Work,
  Code,
  ArrowUpward,
  Psychology,
  Language,
  StorageRounded,
  DesignServices,
  Lightbulb,
  BarChart,
  Download,
  Instagram,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';

// ========== COLOR PALETTE ==========
// Palette claire et élégante
const primaryColor = '#22223b'; // Gris très foncé pour titres
const secondaryColor = '#4ea8de'; // Bleu pastel accent
const accentColor = '#b8c1ec'; // Bleu très clair
const backgroundColor = '#f8f9fa'; // Fond très clair
const cardColor = '#fff';
const textColor = '#22223b';
const subtitleColor = '#6c757d';

// ========== THEME CONFIG ==========
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 900, color: accentColor },
    h2: { fontWeight: 800, color: accentColor },
    h3: { fontWeight: 700, color: accentColor },
    h4: { fontWeight: 700, color: accentColor },
    h5: { fontWeight: 600, color: accentColor },
    h6: { fontWeight: 600, color: accentColor },
  },
  palette: {
    primary: { main: primaryColor },
    secondary: { main: secondaryColor },
    accent: { main: accentColor },
    background: { default: backgroundColor, paper: alpha(primaryColor, 0.9) },
    text: { primary: textColor },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '12px 28px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${alpha(secondaryColor, 0.3)}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: alpha(primaryColor, 0.9),
          border: `1px solid ${alpha(accentColor, 0.2)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 8px 24px ${alpha(secondaryColor, 0.2)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
          background: alpha(secondaryColor, 0.1),
          color: accentColor,
          border: `1px solid ${alpha(secondaryColor, 0.2)}`,
        },
      },
    },
  },
});

// ========== STYLED COMPONENTS ==========
const GradientText = styled(Typography)({
  background: `linear-gradient(135deg, ${secondaryColor} 0%, ${accentColor} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
});

const SectionHeader = ({ icon, title }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
    <Avatar sx={{
      bgcolor: alpha(secondaryColor, 0.2),
      color: secondaryColor,
      mr: 2,
      width: 56,
      height: 56,
      boxShadow: `0 4px 12px ${alpha(secondaryColor, 0.2)}`,
    }}>
      {icon}
    </Avatar>
    <GradientText variant="h2">{title}</GradientText>
  </Box>
);

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        {children}
      </Box>
    </Fade>
  );
};

const Portfolio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'Profil' },
    { id: 'skills', label: 'Compétences' },
    { id: 'experience', label: 'Expérience' },
    { id: 'education', label: 'Formation' },
    { id: 'contact', label: 'Contact' },
  ];

  const experiences = [
    {
      title: "Développeur Full-Stack",
      company: "Assala Iskane",
      duration: "Juin 2024 - Août 2024",
      responsibilities: [
        "Conception et développement d'une application web avec React.js",
        "Développement backend Spring Boot avec MySQL",
        "Maintien de la qualité du code avec GitHub et tests automatisés",
      ],
      color: secondaryColor,
      icon: <Code />,
    },
    {
      title: "Développeur Full-Stack",
      company: "MedZair (Plateforme Médicale)",
      duration: "Juin 2023 - Août 2023",
      responsibilities: [
        "Conception d'application de gestion médicale avec React.js et Flutter",
        "Mise en place d'architecture MVC évolutive",
        "Intégration de Firebase pour l'authentification et données temps réel",
      ],
      color: accentColor,
      icon: <DesignServices />,
    },
    {
      title: "Développeur Web",
      company: "GazToday",
      duration: "Juin 2022",
      responsibilities: [
        "Participation active au développement de solutions web adaptées",
      ],
      color: primaryColor,
      icon: <StorageRounded />,
    },
  ];

  const skillCategories = [
    {
      title: "Langages",
      icon: <Code />,
      color: secondaryColor,
      items: ["Java", "Python", "C", "C++", "C#", "JavaScript", "VB.NET"],
    },
    {
      title: "Bases de Données",
      icon: <StorageRounded />,
      color: accentColor,
      items: ["MySQL", "MongoDB", "Oracle Database", "SQL Server"],
    },
    {
      title: "Frontend",
      icon: <DesignServices />,
      color: primaryColor,
      items: ["React.js", "AngularJS", "HTML5/CSS3", "Flutter"],
    },
    {
      title: "Backend",
      icon: <BarChart />,
      color: secondaryColor,
      items: ["Spring Boot", "ASP.NET", "Node.js/Express.js", "Flask"],
    },
    {
      title: "Outils & DevOps",
      icon: <Lightbulb />,
      color: accentColor,
      items: ["Docker", "Linux", "Git", "Spark"],
    },
    {
      title: "Modélisation",
      icon: <Psychology />,
      color: primaryColor,
      items: ["Design Patterns", "MVC", "UML", "Merise"],
    },
  ];

  const education = [
    {
      degree: "MSc Expert en Informatique et Systèmes d'Information",
      institution: "EPSI - Montpellier, France",
      year: "2024",
    },
    {
      degree: "Master 1 : Ingénierie des Systèmes d'Information",
      institution: "ESISA - Fès, Maroc",
      year: "2023",
    },
    {
      degree: "Licence en Génie Logiciel",
      institution: "ESISA - Fès, Maroc",
      year: "2020",
    },
    {
      degree: "Baccalauréat en Sciences Physiques",
      institution: "Lycée Bensouda - Fès, Maroc",
      year: "2018",
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = menuItems.map((item) => item.id);
      const current = sections.findIndex((section) => {
        const element = document.getElementById(section);
        return element && element.getBoundingClientRect().top <= 100;
      });
      if (current !== -1) setActiveSection(sections[current]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Navigation Bar */}
      <AppBar position="fixed" sx={{
        bgcolor: scrolled ? alpha(primaryColor, 0.95) : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? 2 : 0,
        transition: 'all 0.3s ease',
      }}>
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 800, color: accentColor }}>
            YOUSSEF ASSOIL
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: activeSection === item.id ? secondaryColor : accentColor,
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': activeSection === item.id ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '20%',
                    width: '60%',
                    height: 3,
                    bgcolor: secondaryColor,
                    borderRadius: 3,
                  } : {},
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { md: 'none' } }}
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        PaperProps={{ sx: { width: 250, bgcolor: primaryColor } }}
      >
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <IconButton onClick={() => setSidebarOpen(false)} sx={{ color: accentColor }}>
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ bgcolor: alpha(accentColor, 0.1) }} />
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.id} onClick={() => scrollToSection(item.id)}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  color: activeSection === item.id ? secondaryColor : accentColor,
                  fontWeight: 600
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Enhanced Responsive and Beautiful Hero Section */}
      {/* HERO SECTION - centered, pro, with code video background */}
      <Box id="home" sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        px: { xs: 2, md: 0 },
        bgcolor: backgroundColor,
        borderBottom: '1px solid #e0e0e0',
        overflow: 'hidden',
      }}>
        {/* Video Background */}
        <Box component="video"
          src="/code-background.mp4"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        {/* Overlay pour lisibilité */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(255,255,255,0.85)',
          zIndex: 1,
          backdropFilter: 'blur(2px)',
        }} />
        {/* Hero content */}
        <Container maxWidth="md" sx={{ zIndex: 2, position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Box sx={{
              bgcolor: cardColor,
              borderRadius: 6,
              boxShadow: '0 2px 16px 0 rgba(31, 38, 135, 0.06)',
              p: { xs: 3, sm: 6 },
              textAlign: 'center',
              mb: 4,
              border: '1px solid #e0e0e0',
            }}>
              <Avatar src="./profil.jpg" alt="Youssef Assoil" sx={{ width: 120, height: 120, mx: 'auto', mb: 2, boxShadow: 1, border: '3px solid #e0e0e0' }} />
              <Typography variant="h3" sx={{ fontWeight: 800, color: primaryColor, mb: 1, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Inter, Neue Montreal, Arial, sans-serif' }}>Youssef Assoil</Typography>
              <Typography variant="h5" sx={{ color: secondaryColor, fontWeight: 600, mb: 2, letterSpacing: 1, textTransform: 'uppercase' }}>Ingénieur Logiciel – Full-Stack</Typography>
              <Typography variant="subtitle1" sx={{ color: subtitleColor, mb: 3, fontStyle: 'italic', fontSize: '1.1rem' }}>
                Développeur passionné par la création de solutions robustes et élégantes. Spécialisé en React, Spring Boot, et l’architecture logicielle.
                </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <IconButton href="https://www.linkedin.com/in/assoilyoussef" target="_blank" sx={{ color: secondaryColor, bgcolor: accentColor, '&:hover': { bgcolor: secondaryColor, color: '#fff', transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}><LinkedIn /></IconButton>
                <IconButton href="https://github.com/youssef-ASSOIL" target="_blank" sx={{ color: primaryColor, bgcolor: accentColor, '&:hover': { bgcolor: primaryColor, color: '#fff', transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}><GitHub /></IconButton>
                <IconButton href="https://www.instagram.com/youssef_assoil/" target="_blank" sx={{ color: '#d81b60', bgcolor: '#fce4ec', '&:hover': { bgcolor: '#d81b60', color: '#fff', transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}><Instagram /></IconButton>
              </Box>
                <Button
                  variant="contained"
                size="large"
                href="/CV_ASSOIL_YOUSSEF.pdf"
                target="_blank"
                startIcon={<Download />}
                  sx={{
                    bgcolor: secondaryColor,
                  color: '#fff',
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: 1,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  '&:hover': { bgcolor: primaryColor, color: '#fff', transform: 'translateY(-2px)' },
                  transition: 'all 0.2s',
                  }}
                >
                  Télécharger CV
                </Button>
                </Box>
              </motion.div>
        </Container>
      </Box>

      {/* Profile Section */}
      {/* --- ABOUT SECTION --- */}
      <Box id="about" sx={{
        py: { xs: 8, md: 12 },
        bgcolor: backgroundColor,
        position: 'relative',
        backgroundImage: 'url(/montpellier.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(255,255,255,0.85)',
          zIndex: 1,
          backdropFilter: 'blur(2px)',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <SectionHeader icon={<Psychology />} title="Profil" />
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: accentColor, fontSize: { xs: '1.1rem', md: '1.2rem' } }}>
              Développeur full-stack en formation MSc à l’EPSI Montpellier, je combine des compétences solides en Java/Spring Boot, React.js et MySQL avec une expérience concrète en entreprise et en projets académiques. À l’aise avec la modélisation UML, l’architecture MVC et les outils DevOps, je suis autonome, curieux et déterminé à progresser dans un environnement professionnel.
                </Typography>
              </motion.div>
        </Container>
      </Box>

      {/* Skills Section */}
      {/* --- SKILLS SECTION --- */}
      <Box id="skills" sx={{ py: 10, bgcolor: primaryColor }}>
        <Container maxWidth="lg">
          <SectionHeader icon={<Code />} title="Compétences Techniques" />
          <Grid container spacing={4}>
            {/* Programming Languages */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: alpha(secondaryColor, 0.2), color: secondaryColor, mr: 2 }}><Code /></Avatar>
                      <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor }}>Langages</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {/* Add icons for each language */}
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" width="20" alt="Java" />} label="Java" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="20" alt="Python" />} label="Python" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" width="20" alt="C" />} label="C" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" width="20" alt="C++" />} label="C++" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" width="20" alt="C#" />} label="C#" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="20" alt="JavaScript" />} label="JavaScript" />
                      <Chip icon={<Code />} label="VB.NET" />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Databases */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: alpha(accentColor, 0.2), color: accentColor, mr: 2 }}><StorageRounded /></Avatar>
                      <Typography variant="h6" fontWeight={700} sx={{ color: accentColor }}>Bases de Données</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="20" alt="MySQL" />} label="MySQL" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="20" alt="PostgreSQL" />} label="PostgreSQL" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="20" alt="MongoDB" />} label="MongoDB" />
                      <Chip icon={<StorageRounded />} label="SQL Server" />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Frontend */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <Card elevation={6} sx={{ border: '2px solid #42a5f5', boxShadow: '0 8px 32px 0 rgba(66, 165, 245, 0.15)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', mr: 2, width: 48, height: 48 }}><DesignServices fontSize="large" /></Avatar>
                      <Typography variant="h5" fontWeight={800} sx={{ color: '#1976d2', letterSpacing: 1 }}>FrontEnd</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="20" alt="React.js" />} label="React.js" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" width="20" alt="AngularJS" />} label="AngularJS" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="20" alt="HTML5" />} label="HTML5/CSS3" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" width="20" alt="Flutter" />} label="Flutter" />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Backend */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: alpha(secondaryColor, 0.2), color: secondaryColor, mr: 2 }}><BarChart /></Avatar>
                      <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor }}>BackEnd</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" width="20" alt="Spring Boot" />} label="Spring Boot" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" width="20" alt="ASP.NET" />} label="ASP.NET" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20" alt="Node.js" />} label="Node.js/Express.js" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="20" alt="Flask" />} label="Flask" />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* DevOps & Tools */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: alpha(accentColor, 0.2), color: accentColor, mr: 2 }}><Lightbulb /></Avatar>
                      <Typography variant="h6" fontWeight={700} sx={{ color: accentColor }}>DevOps & Outils</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="20" alt="Docker" />} label="Docker" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="20" alt="Linux" />} label="Linux" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="20" alt="Git" />} label="Git" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" width="20" alt="Kubernetes" />} label="Kubernetes" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" width="20" alt="Jenkins" />} label="Jenkins" />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Data Science & Analyse */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} viewport={{ once: true }}>
                <Card elevation={6} sx={{ border: '2px solid #7e57c2', boxShadow: '0 8px 32px 0 rgba(126, 87, 194, 0.15)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#ede7f6', color: '#512da8', mr: 2, width: 48, height: 48 }}><BarChart fontSize="large" /></Avatar>
                      <Typography variant="h5" fontWeight={800} sx={{ color: '#512da8', letterSpacing: 1 }}>Data Science & Analyse</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" width="20" alt="Spark" />} label="Spark" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" width="20" alt="R" />} label="R" />
                      <Chip icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="20" alt="Pandas" />} label="Pandas" />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Software Engineering & Modeling */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} viewport={{ once: true }}>
                  <Card elevation={3}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: alpha(secondaryColor, 0.2), color: secondaryColor, mr: 2 }}><Psychology /></Avatar>
                      <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor }}>Ingénierie Logicielle</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<Psychology />} label="Design Patterns" />
                      <Chip icon={<Code />} label="MVC" />
                      <Chip icon={<Psychology />} label="UML" />
                      <Chip icon={<Psychology />} label="Merise" />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Experience Section */}
      {/* --- EXPERIENCE SECTION --- */}
      <Box id="experience" sx={{
        py: 10,
        bgcolor: backgroundColor,
        position: 'relative',
        backgroundImage: 'url(/pexels-louizi-ayoub-976641-29755398.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(255,255,255,0.85)',
          zIndex: 1,
          backdropFilter: 'blur(2px)',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader icon={<Work />} title="Expérience Professionnelle" />
          <Box sx={{ position: 'relative' }}>
            {/* Assala Iskane */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <Card elevation={3} sx={{ mb: 4, borderLeft: `4px solid ${secondaryColor}` }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: secondaryColor, color: '#fff', mr: 2 }}><Code /></Avatar>
                      <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor }}>Développeur Full-Stack</Typography>
                      <Typography variant="body1" fontWeight={600} sx={{ color: accentColor }}>Assala Iskane</Typography>
                    </Box>
                  </Box>
                  <Chip label="Juin 2024 - Août 2024" sx={{ bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor, mb: 2 }} />
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1, color: accentColor }}>
                      Application de gestion interne (employés, transport, marchandises, facturation)
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1, color: accentColor }}>
                      Java Spring Boot (back-end), React.js (front-end), MySQL
                        </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1, color: accentColor }}>
                      UML, MCD, architecture MVC
                        </Typography>
                      </Box>
                </CardContent>
              </Card>
            </motion.div>
            {/* MedZair */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
              <Card elevation={3} sx={{ mb: 4, borderLeft: `4px solid ${accentColor}` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: accentColor, color: primaryColor, mr: 2 }}><DesignServices /></Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: accentColor }}>Développeur Full-Stack</Typography>
                      <Typography variant="body1" fontWeight={600} sx={{ color: accentColor }}>MedZair (Plateforme Médicale)</Typography>
                    </Box>
                  </Box>
                  <Chip label="Juin 2023 - Août 2023" sx={{ bgcolor: alpha(accentColor, 0.1), color: accentColor, mb: 2 }} />
                    <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1, color: accentColor }}>
                      Plateforme web de gestion médicale (React.js, Node.js, MongoDB)
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1, color: accentColor }}>
                      UML, modélisation des processus métier
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1, color: accentColor }}>
                      Gestion des remplacements, traçabilité, statistiques, sécurité
                        </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
            {/* GazToday */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
              <Card elevation={3} sx={{ mb: 4, borderLeft: `4px solid ${primaryColor}` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: primaryColor, color: '#fff', mr: 2 }}><StorageRounded /></Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: primaryColor }}>Développeur Web</Typography>
                      <Typography variant="body1" fontWeight={600} sx={{ color: accentColor }}>GazToday</Typography>
                    </Box>
                  </Box>
                  <Chip label="Juin 2022" sx={{ bgcolor: alpha(primaryColor, 0.1), color: primaryColor, mb: 2 }} />
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Projects Section */}
      {/* --- PROJECTS SECTION --- */}
      <Box id="projects" sx={{ py: 10, bgcolor: backgroundColor }}>
        <Container maxWidth="lg">
          <SectionHeader icon={<Code />} title="Projets Académiques" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor, mb: 1 }}>
                      Application Web/Mobile de Gestion de Planning (PFA BAC+3)
                    </Typography>
                    <Typography variant="body2" sx={{ color: accentColor }}>
                      2022-2023
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor, mb: 1 }}>
                      Jeu d'Échecs (C++/QtCreator)
                    </Typography>
                    <Typography variant="body2" sx={{ color: accentColor }}>
                      Interface graphique interactive, IA
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor, mb: 1 }}>
                      Application de Gestion des Emprunts d'une Bibliothèque (C#/.NET)
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor, mb: 1 }}>
                      Gestion Scolaire (Python/Flask/MongoDB)
                    </Typography>
                    <Typography variant="body2" sx={{ color: accentColor }}>
                      Solution web admin, API RESTful
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor, mb: 1 }}>
                      Solution complète (Flutter/Dart/Firebase/MongoDB)
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Education Section */}
      {/* --- EDUCATION SECTION --- */}
      <Box id="education" sx={{ py: 10, bgcolor: primaryColor }}>
        <Container maxWidth="lg">
          <SectionHeader icon={<School />} title="Formation" />
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                <Card elevation={3} sx={{ borderLeft: `4px solid ${secondaryColor}` }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor }}>
                      MSc Expert en Informatique et Systèmes d’Information
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: accentColor }}>
                      EPSI, Montpellier, France
                    </Typography>
                    <Chip label="2025" sx={{ mt: 1, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <Card elevation={3} sx={{ borderLeft: `4px solid ${secondaryColor}` }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor }}>
                      Master 1 : Ingénierie des Systèmes d’Information
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: accentColor }}>
                      ESISA, Fès, Maroc
                    </Typography>
                    <Chip label="2024" sx={{ mt: 1, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                  <Card elevation={3} sx={{ borderLeft: `4px solid ${secondaryColor}` }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={700} sx={{ color: secondaryColor }}>
                      Licence en Génie Logiciel
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: accentColor }}>
                      ESISA, Fès, Maroc
                      </Typography>
                    <Chip label="2023" sx={{ mt: 1, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Certifications Section */}
      {/* --- CERTIFICATIONS SECTION --- */}
      <Box id="certifications" sx={{
        py: 10,
        bgcolor: backgroundColor,
        position: 'relative',
        backgroundImage: 'url(/pexels-ryutaro-5472516.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(255,255,255,0.85)',
          zIndex: 1,
          backdropFilter: 'blur(2px)',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader icon={<Psychology />} title="Certifications" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}><Chip label="Google Cloud Engineering Certificate" sx={{ mb: 2, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} /></Grid>
            <Grid item xs={12} sm={6} md={4}><Chip label="Cisco – NDG Linux Essentials" sx={{ mb: 2, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} /></Grid>
            <Grid item xs={12} sm={6} md={4}><Chip label="JavaScript Foundations Professional Certificate by Mozilla" sx={{ mb: 2, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} /></Grid>
            <Grid item xs={12} sm={6} md={4}><Chip label="Coursera – Divide and Conquer, Sorting and Searching, and Randomized Algorithms" sx={{ mb: 2, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} /></Grid>
            <Grid item xs={12} sm={6} md={4}><Chip label="LinkedIn Learning – Advanced Design Patterns: Design Principles" sx={{ mb: 2, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} /></Grid>
            <Grid item xs={12} sm={6} md={4}><Chip label="Java Foundations Professional Certificate by JetBrains" sx={{ mb: 2, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} /></Grid>
            <Grid item xs={12} sm={6} md={4}><Chip label="Docker Foundations Professional Certificate" sx={{ mb: 2, bgcolor: alpha(secondaryColor, 0.1), color: secondaryColor }} /></Grid>
          </Grid>
        </Container>
      </Box>

      {/* Languages Section */}
      {/* --- LANGUAGES SECTION --- */}
      <Box id="languages" sx={{ py: 10, bgcolor: primaryColor }}>
        <Container maxWidth="lg">
          <SectionHeader icon={<Language />} title="Langues" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}><Chip label="Arabe : Langue Maternelle" sx={{ mb: 2, bgcolor: alpha(accentColor, 0.1), color: accentColor }} /></Grid>
            <Grid item xs={12} sm={4}><Chip label="Français : B2 (TCF)" sx={{ mb: 2, bgcolor: alpha(accentColor, 0.1), color: accentColor }} /></Grid>
            <Grid item xs={12} sm={4}><Chip label="Anglais : intermédiaire" sx={{ mb: 2, bgcolor: alpha(accentColor, 0.1), color: accentColor }} /></Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{
        py: 10,
        position: 'relative',
        bgcolor: backgroundColor,
        overflow: 'hidden',
      }}>
        {/* Video Background */}
        <Box component="video"
          src="/code-background.mp4"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(255,255,255,0.85)',
          zIndex: 1,
          backdropFilter: 'blur(2px)',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader icon={<Email />} title="Contact" />
          <Grid container spacing={6}>
            {/* Contact Info Card */}
            <Grid item xs={12} md={5}>
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
                <Paper elevation={6} sx={{
                  p: 4,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.7)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #e0e0e0',
                }}>
                  <Typography variant="h5" sx={{ mb: 3, color: secondaryColor, fontWeight: 700, letterSpacing: 1 }}>
                    Coordonnées
                  </Typography>
                  {[{ icon: <LinkedIn />, label: "LinkedIn", value: "/assoilyoussef", link: "https://www.linkedin.com/in/assoilyoussef" },
                    { icon: <GitHub />, label: "GitHub", value: "youssef-ASSOIL", link: "https://github.com/youssef-ASSOIL" },
                    { icon: <Instagram />, label: "Instagram", value: "youssef_assoil", link: "https://www.instagram.com/youssef_assoil/" },
                    { icon: <Email />, label: "Email", value: "assoilyoussef02@gmail.com", link: "mailto:assoilyoussef02@gmail.com" },
                    { icon: <Phone />, label: "Téléphone", value: "+33 7 66 31 93 53" },
                  ].map((contact, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: alpha(secondaryColor, 0.15), color: secondaryColor, mr: 2, boxShadow: 1 }}>
                        {contact.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: accentColor, fontWeight: 600 }}>{contact.label}</Typography>
                        {contact.link ? (
                          <Typography component="a" href={contact.link} target="_blank" rel="noopener" variant="body1" fontWeight={700} sx={{ color: accentColor, textDecoration: 'none', '&:hover': { color: secondaryColor } }}>{contact.value}</Typography>
                        ) : (
                          <Typography variant="body1" fontWeight={700} sx={{ color: accentColor }}>{contact.value}</Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <IconButton href="https://www.linkedin.com/in/assoilyoussef" target="_blank" sx={{ color: secondaryColor, bgcolor: accentColor, '&:hover': { bgcolor: secondaryColor, color: '#fff', transform: 'scale(1.1)' }, transition: 'all 0.2s' }}><LinkedIn /></IconButton>
                    <IconButton href="https://github.com/youssef-ASSOIL" target="_blank" sx={{ color: primaryColor, bgcolor: accentColor, '&:hover': { bgcolor: primaryColor, color: '#fff', transform: 'scale(1.1)' }, transition: 'all 0.2s' }}><GitHub /></IconButton>
                    <IconButton href="https://www.instagram.com/youssef_assoil/" target="_blank" sx={{ color: '#d81b60', bgcolor: '#fce4ec', '&:hover': { bgcolor: '#d81b60', color: '#fff', transform: 'scale(1.1)' }, transition: 'all 0.2s' }}><Instagram /></IconButton>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            {/* Contact Form Card */}
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
                <Paper elevation={6} sx={{
                  p: 4,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #e0e0e0',
                }}>
                  <Typography variant="h5" sx={{ mb: 3, color: primaryColor, fontWeight: 700, letterSpacing: 1 }}>
                    Envoyez-moi un message
                  </Typography>
                  <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField label="Nom" variant="outlined" fullWidth required sx={{ borderRadius: 3, bgcolor: '#f5faff' }} />
                    <TextField label="Email" variant="outlined" fullWidth required type="email" sx={{ borderRadius: 3, bgcolor: '#f5faff' }} />
                    <TextField label="Message" variant="outlined" fullWidth required multiline rows={4} sx={{ borderRadius: 3, bgcolor: '#f5faff' }} />
                    <Button type="submit" variant="contained" size="large" sx={{
                      bgcolor: secondaryColor,
                      color: '#fff',
                      borderRadius: '30px',
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: 1,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      alignSelf: 'flex-end',
                      '&:hover': { bgcolor: primaryColor, color: '#fff', transform: 'translateY(-2px) scale(1.05)' },
                      transition: 'all 0.2s',
                    }}>
                      Envoyer
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: primaryColor, color: accentColor, py: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={700}>Youssef Assoil</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Développeur Full-Stack spécialisé en React et Spring Boot
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <IconButton
                  href="https://www.linkedin.com/in/assoilyoussef"
                  target="_blank"
                  sx={{ color: accentColor, '&:hover': { bgcolor: alpha(accentColor, 0.1) } }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://github.com/youssef-ASSOIL"
                  target="_blank"
                  sx={{ color: accentColor, '&:hover': { bgcolor: alpha(accentColor, 0.1) } }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://www.instagram.com/youssef_assoil/"
                  target="_blank"
                  sx={{ color: accentColor, '&:hover': { bgcolor: alpha(accentColor, 0.1) } }}
                >
                  <Instagram />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.6 }}>
                © {new Date().getFullYear()} - Tous droits réservés
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ScrollTop>
        <IconButton sx={{ bgcolor: secondaryColor, color: textColor, '&:hover': { bgcolor: alpha(secondaryColor, 0.9) } }}>
          <ArrowUpward />
        </IconButton>
      </ScrollTop>
    </ThemeProvider>
  );
};

export default Portfolio;
