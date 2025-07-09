import React, { useState, useEffect } from 'react';
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
  CardMedia,
  TextField,
  CssBaseline,
  Fade,
  Grow,
  Slide,
  Divider,
  useTheme,
  styled,
  useScrollTrigger,
  useMediaQuery,
  Paper,
  Avatar,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Menu,
  Close,
  Construction,
  Handyman,
  Factory,
  Language,
  Phone,
  Email,
  LocationOn,
  ArrowUpward,
  Facebook,
  Instagram,
  LinkedIn,
  WhatsApp,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import logo from '../../images/logo00.png';
import project1 from '../../images/1.jpeg';
import project2 from '../../images/2.jpeg';
import project3 from '../../images/3.jpeg';

// Enhanced color palette
const primaryColor = '#0B3954'; // Deeper blue for professional look
const secondaryColor = '#5C738A'; // Softer secondary color
const tertiaryColor = '#FF6B4A'; // Vibrant orange-red for CTA
const quaternaryColor = '#FFD166'; // Warmer gold
const backgroundColor = '#F7F9FC'; // Softer background
const textColor = '#2D3748'; // Softer black for text
const lightTextColor = '#F0F4F8'; // Light text color
const accentColor = '#4ECDC4'; // Accent teal color

// Animated components with framer-motion
const MotionBox = styled(motion.div)({
  width: '100%',
});

const HeroButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '12px 32px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'transform 0.4s, box-shadow 0.4s',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
    '& .project-image': {
      transform: 'scale(1.05)',
    },
    '& .project-overlay': {
      opacity: 1,
    },
  },
}));

const ProjectMedia = styled(CardMedia)(({ theme }) => ({
  height: 280,
  transition: 'transform 0.6s ease',
}));

const ScrollableComponent = ({ children, threshold = 300 }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
};

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: alpha(tertiaryColor, 0.5),
    },
    '&.Mui-focused fieldset': {
      borderColor: tertiaryColor,
    },
    borderRadius: '10px',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: primaryColor,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(lightTextColor, 0.1),
  color: lightTextColor,
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: alpha(lightTextColor, 0.2),
    transform: 'translateY(-3px)',
  },
}));

export default function ProfessionalHomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'contact', label: 'Contact' },
  ];

  const services = [
    {
      title: 'Construction',
      icon: <Construction fontSize="large" sx={{ color: lightTextColor }} />,
      description: 'Projets résidentiels et commerciaux avec des normes de qualité supérieures et finitions haut de gamme.',
      color: primaryColor,
    },
    {
      title: 'Travaux Divers',
      icon: <Handyman fontSize="large" sx={{ color: lightTextColor }} />,
      description: "Services de rénovation et d'aménagement personnalisés selon vos besoins et vos souhaits spécifiques.",
      color: secondaryColor,
    },
    {
      title: 'Exploitation de Carrières',
      icon: <Factory fontSize="large" sx={{ color: lightTextColor }} />,
      description: 'Extraction et fourniture de matériaux de construction de haute qualité pour tous vos projets.',
      color: tertiaryColor,
    },
    {
      title: 'Import & Export',
      icon: <Language fontSize="large" sx={{ color: lightTextColor }} />,
      description: "Commerce international de matériaux et d'équipements de construction des meilleures sources mondiales.",
      color: accentColor,
    },
  ];

  const projects = [
    {
      image: project1,
      title: 'Projet Résidentiel Premium',
      description: 'Construction de villas haut de gamme avec des finitions exceptionnelles',
      category: 'Résidentiel',
      location: 'Fès, Maroc',
    },
    {
      image: project2,
      title: 'Complexe Commercial',
      description: 'Développement d\'un espace commercial moderne avec parking souterrain',
      category: 'Commercial',
      location: 'Casablanca, Maroc',
    },
    {
      image: project3,
      title: 'Infrastructure Urbaine',
      description: 'Aménagement de routes et réseaux urbains pour une ville nouvelle',
      category: 'Infrastructure',
      location: 'Rabat, Maroc',
    },
    {
      image: project3,
      title: 'Rénovation Historique',
      description: 'Restauration d\'un bâtiment patrimonial avec techniques traditionnelles',
      category: 'Patrimoine',
      location: 'Meknès, Maroc',
    }
  ];

  const achievements = [
    { number: "18+", label: "Années d'expérience" },
    { number: "250+", label: "Projets réalisés" },
    { number: "120+", label: "Clients satisfaits" },
    { number: "45+", label: "Professionnels experts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = menuItems.map(item => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          transition: 'all 0.3s ease-in-out',
          bgcolor: scrolled ? alpha(backgroundColor, 0.95) : 'transparent',
          color: scrolled ? primaryColor : lightTextColor,
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid ${alpha(primaryColor, 0.1)}` : 'none',
          height: scrolled ? '70px' : '90px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: scrolled ? 50 : 60, transition: 'all 0.3s ease' }} />
            <Typography
              variant="h6"
              sx={{
                ml: 1,
                fontWeight: 800,
                display: { xs: 'none', sm: 'block' },
                fontSize: scrolled ? '1.2rem' : '1.5rem',
                transition: 'all 0.3s ease',
                color: scrolled ? primaryColor : lightTextColor,
              }}
            >
              ASSALA ISKANE
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, ml: 'auto' }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: 'inherit',
                  position: 'relative',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  overflow: 'hidden',
                  textTransform: 'none',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 5,
                    left: 8,
                    right: 8,
                    height: 3,
                    borderRadius: '2px',
                    bgcolor: tertiaryColor,
                    transform: activeSection === item.id ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'center',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="contained"
              sx={{
                bgcolor: tertiaryColor,
                color: '#fff',
                ml: 2,
                px: 3,
                borderRadius: '30px',
                boxShadow: '0 4px 14px rgba(255, 107, 74, 0.4)',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: alpha(tertiaryColor, 0.9),
                },
              }}
            >
              Devis Gratuit
            </Button>
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { md: 'none' }, ml: 'auto' }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        PaperProps={{
          sx: {
            width: '280px',
            backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, #1D4E70 100%)`,
            color: lightTextColor,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
              ASSALA
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={() => setSidebarOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ bgcolor: alpha(lightTextColor, 0.2), mb: 3 }} />

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              sx={{
                mb: 1,
                borderRadius: '8px',
                bgcolor: activeSection === item.id ? alpha(tertiaryColor, 0.2) : 'transparent',
                '&:hover': {
                  bgcolor: alpha(lightTextColor, 0.1),
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: activeSection === item.id ? 700 : 500,
                  fontSize: '1.1rem',
                }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', textAlign: 'center', pt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: tertiaryColor,
              color: '#fff',
              py: 1.5,
              borderRadius: '30px',
              boxShadow: '0 4px 14px rgba(255, 107, 74, 0.4)',
              textTransform: 'none',
              '&:hover': {
                bgcolor: alpha(tertiaryColor, 0.9),
              },
            }}
          >
            Devis Gratuit
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <SocialButton size="small">
              <Facebook fontSize="small" />
            </SocialButton>
            <SocialButton size="small">
              <Instagram fontSize="small" />
            </SocialButton>
            <SocialButton size="small">
              <LinkedIn fontSize="small" />
            </SocialButton>
          </Box>
        </Box>
      </Drawer>

      <Box
        id="home"
        sx={{
          pt: { xs: 10, md: 0 },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(to right, ${alpha(primaryColor, 0.9)} 0%, ${alpha(
            primaryColor,
            0.7
          )} 100%), url(/construction-hero.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: lightTextColor,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="overline"
                  component="div"
                  sx={{
                    color: quaternaryColor,
                    fontWeight: 600,
                    letterSpacing: 2,
                    mb: 2
                  }}
                >
                  EXPERTISE EN CONSTRUCTION & DÉVELOPPEMENT
                </Typography>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  Bâtissons ensemble{' '}
                  <Box
                    component="span"
                    sx={{
                      color: tertiaryColor,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        backgroundColor: alpha(quaternaryColor, 0.4),
                        zIndex: -1,
                      }
                    }}
                  >
                    votre avenir
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  gutterBottom
                  sx={{
                    mb: 6,
                    fontWeight: 400,
                    color: alpha(lightTextColor, 0.9),
                    maxWidth: '800px',
                    lineHeight: 1.6,
                  }}
                >
                  Depuis 18 ans, ASSALA ISKANE transforme le paysage marocain avec des projets de construction exceptionnels.
                  Notre expertise couvre tous vos projets résidentiels et commerciaux avec un engagement
                  inébranlable envers la qualité et l'innovation.
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                  <HeroButton
                    variant="contained"
                    sx={{
                      bgcolor: tertiaryColor,
                      color: '#fff',
                      flex: { xs: '1 0 100%', sm: 'auto' },
                      mb: { xs: 2, sm: 0 },
                      fontSize: '1rem',
                      boxShadow: '0 8px 25px rgba(255, 107, 74, 0.5)',
                    }}
                  >
                    Découvrir Nos Services
                  </HeroButton>
                  <HeroButton
                    variant="outlined"
                    sx={{
                      borderColor: lightTextColor,
                      color: lightTextColor,
                      borderWidth: '2px',
                      flex: { xs: '1 0 100%', sm: 'auto' },
                      fontSize: '1rem',
                      '&:hover': {
                        borderColor: quaternaryColor,
                        color: quaternaryColor,
                        bgcolor: 'transparent',
                      }
                    }}
                  >
                    Contactez-nous
                  </HeroButton>
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Paper
                  elevation={12}
                  sx={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transform: 'rotate(2deg)',
                    width: '100%',
                    height: '400px',
                    backgroundImage: 'url(/construction-showcase.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            py: 3,
            bgcolor: alpha(primaryColor, 0.7),
            backdropFilter: 'blur(10px)'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {achievements.map((achievement, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box textAlign="center">
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: quaternaryColor,
                        mb: 1
                      }}
                    >
                      {achievement.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: lightTextColor,
                        fontWeight: 500
                      }}
                    >
                      {achievement.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>

      <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: backgroundColor }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-20px',
                      left: '-20px',
                      width: '120px',
                      height: '120px',
                      borderTop: `8px solid ${tertiaryColor}`,
                      borderLeft: `8px solid ${tertiaryColor}`,
                      zIndex: 1,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-20px',
                      right: '-20px',
                      width: '120px',
                      height: '120px',
                      borderBottom: `8px solid ${quaternaryColor}`,
                      borderRight: `8px solid ${quaternaryColor}`,
                      zIndex: 1,
                    }
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Paper
                        elevation={10}
                        sx={{
                          height: '300px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          backgroundImage: 'url(/about-image1.jpg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          mb: 2
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Paper
                        elevation={6}
                        sx={{
                          height: '140px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          backgroundImage: 'url(/about-image2.jpg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          mb: 2
                        }}
                      />
                      <Paper
                        elevation={6}
                        sx={{
                          height: '140px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          backgroundImage: 'url(/about-image3.jpg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="overline"
                  component="div"
                  sx={{
                    color: tertiaryColor,
                    fontWeight: 600,
                    letterSpacing: 2,
                    mb: 2
                  }}
                >
                  À PROPOS DE NOUS
                </Typography>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: primaryColor }}>
                  18 Ans d'Excellence dans la Construction
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: textColor, mb: 4, lineHeight: 1.8 }}>
                  Fondée en 2006, ASSALA ISKANE s'est imposée comme un leader dans le secteur de la construction au Maroc.
                  Notre philosophie repose sur l'excellence, l'innovation et l'engagement envers nos clients. Chaque projet
                  que nous entreprenons reflète notre souci du détail et notre passion pour la qualité.
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: textColor, mb: 4, lineHeight: 1.8 }}>
                  Avec une équipe de professionnels hautement qualifiés et une expertise diversifiée, nous relevons tous les défis
                  architecturaux et de construction. Notre approche personnalisée garantit que chaque vision devient réalité,
                  dans le respect des délais et des budgets.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: tertiaryColor,
                          mr: 1.5
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Qualité Supérieure
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: tertiaryColor,
                          mr: 1.5
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Équipe d'Experts
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: tertiaryColor,
                          mr: 1.5
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Projets Dans les Délais
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: tertiaryColor,
                          mr: 1.5
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Innovation Continue
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: primaryColor,
                    color: lightTextColor,
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: `0 8px 25px ${alpha(primaryColor, 0.3)}`,
                    '&:hover': {
                      bgcolor: alpha(primaryColor, 0.9),
                      boxShadow: `0 12px 30px ${alpha(primaryColor, 0.4)}`,
                    }
                  }}
                >
                  En Savoir Plus
                </Button>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="overline"
              component="div"
              sx={{
                color: tertiaryColor,
                fontWeight: 600,
                letterSpacing: 2,
                mb: 2
              }}
            >
              NOS EXPERTISES
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: primaryColor,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  backgroundColor: quaternaryColor,
                  borderRadius: '2px',
                }
              }}
            >
              Nos Services Experts
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                mt: 4,
                color: secondaryColor
              }}
            >
              Nous proposons une gamme complète de services pour répondre à tous vos besoins en matière de construction et de développement immobilier.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ServiceCard elevation={5}>
                    <Box
                      sx={{
                        bgcolor: service.color,
                        p: 4,
                        textAlign: 'center',
                        minHeight: 180,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '16px 16px 0 0',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `radial-gradient(circle at top right, ${alpha('#fff', 0.2)}, transparent 70%)`,
                        }
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: 'transparent',
                          width: 80,
                          height: 80,
                          '& .MuiSvgIcon-root': {
                            fontSize: 50,
                          }
                        }}
                      >
                        {service.icon}
                      </Avatar>
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          color: primaryColor,
                          pb: 1,
                          borderBottom: `2px solid ${alpha(service.color, 0.3)}`,
                          display: 'inline-block',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 2,
                          lineHeight: 1.8,
                          minHeight: '5.4em'
                        }}
                      >
                        {service.description}
                      </Typography>
                      <Box sx={{ mt: 3, textAlign: 'right' }}>
                        <Button
                          sx={{
                            color: service.color,
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: alpha(service.color, 0.1),
                            }
                          }}
                        >
                          En savoir plus →
                        </Button>
                      </Box>
                    </CardContent>
                  </ServiceCard>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: `linear-gradient(145deg, ${primaryColor} 0%, #1a5276 100%)`,
          color: lightTextColor,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  Prêt à transformer votre vision en réalité ?
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé gratuit.
                </Typography>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: tertiaryColor,
                    color: '#fff',
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    boxShadow: `0 8px 25px ${alpha(tertiaryColor, 0.5)}`,
                    '&:hover': {
                      bgcolor: alpha(tertiaryColor, 0.9),
                      boxShadow: `0 12px 30px ${alpha(tertiaryColor, 0.6)}`,
                    }
                  }}
                >
                  Demander un Devis Gratuit
                </Button>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="gallery" sx={{ py: { xs: 8, md: 12 }, bgcolor: backgroundColor }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="overline"
              component="div"
              sx={{
                color: tertiaryColor,
                fontWeight: 600,
                letterSpacing: 2,
                mb: 2
              }}
            >
              PROJETS RÉALISÉS
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: primaryColor,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  backgroundColor: quaternaryColor,
                  borderRadius: '2px',
                }
              }}
            >
              Galerie de Projets
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                mt: 4,
                color: secondaryColor
              }}
            >
              Découvrez notre portfolio de réalisations exceptionnelles. Chaque projet témoigne de notre engagement envers l'excellence et l'innovation.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard elevation={5}>
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <ProjectMedia
                        component="img"
                        image={project.image}
                        alt={project.title}
                        className="project-image"
                      />
                      <Box
                        className="project-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: alpha(primaryColor, 0.8),
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          opacity: 0,
                          transition: 'opacity 0.4s ease',
                          p: 3,
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            color: lightTextColor,
                            borderColor: lightTextColor,
                            borderRadius: '30px',
                            textTransform: 'none',
                            px: 3,
                            '&:hover': {
                              borderColor: quaternaryColor,
                              color: quaternaryColor,
                              bgcolor: 'transparent',
                            }
                          }}
                        >
                          Voir Détails
                        </Button>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Chip
                        label={project.category}
                        size="small"
                        sx={{
                          bgcolor: alpha(secondaryColor, 0.1),
                          color: secondaryColor,
                          fontWeight: 600,
                          mb: 1.5
                        }}
                      />
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          color: primaryColor,
                          fontSize: '1.1rem',
                          lineHeight: 1.3
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: secondaryColor }}>
                        <LocationOn fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {project.location}
                        </Typography>
                      </Box>
                    </CardContent>
                  </ProjectCard>
                </MotionBox>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: primaryColor,
                color: primaryColor,
                borderWidth: 2,
                borderRadius: '30px',
                px: 4,
                py: 1.2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha(primaryColor, 0.05)
                }
              }}
            >
              Voir Tous les Projets
            </Button>
          </Box>
        </Container>
      </Box>

      <Box id="contact" sx={{ py: { xs: 8, md: 12 }, bgcolor: primaryColor }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography variant="overline" sx={{ color: quaternaryColor, fontWeight: 600, letterSpacing: 2 }}>
                  CONTACTEZ-NOUS
                </Typography>
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700, color: lightTextColor, mt: 1 }}>
                  Prenons Contact
                </Typography>
                <Typography variant="body1" color={alpha(lightTextColor, 0.8)} paragraph sx={{ mb: 4, maxWidth: '500px' }}>
                  Notre équipe est prête à répondre à toutes vos questions. Contactez-nous pour discuter de votre prochain projet ou pour obtenir plus d'informations sur nos services.
                </Typography>

                <Box sx={{ mt: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(lightTextColor, 0.1),
                        color: quaternaryColor,
                        mr: 2,
                      }}
                    >
                      <LocationOn />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" color={lightTextColor} sx={{ fontWeight: 600 }}>
                        Adresse
                      </Typography>
                      <Typography variant="body2" color={alpha(lightTextColor, 0.8)}>
                        ROUTE DE SEFROU IMMEUBLE N 3 BUREAU 12, FES, MAROC
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(lightTextColor, 0.1),
                        color: quaternaryColor,
                        mr: 2,
                      }}
                    >
                      <Phone />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" color={lightTextColor} sx={{ fontWeight: 600 }}>
                        Téléphone
                      </Typography>
                      <Typography variant="body2" color={alpha(lightTextColor, 0.8)}>
                        +212 XXX XXX XXX
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(lightTextColor, 0.1),
                        color: quaternaryColor,
                        mr: 2,
                      }}
                    >
                      <Email />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" color={lightTextColor} sx={{ fontWeight: 600 }}>
                        Email
                      </Typography>
                      <Typography variant="body2" color={alpha(lightTextColor, 0.8)}>
                        contact@assalaiskane.ma
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 6, display: 'flex' }}>
                  <SocialButton>
                    <Facebook />
                  </SocialButton>
                  <SocialButton>
                    <Instagram />
                  </SocialButton>
                  <SocialButton>
                    <LinkedIn />
                  </SocialButton>
                  <SocialButton>
                    <WhatsApp />
                  </SocialButton>
                </Box>
              </MotionBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card elevation={12} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: primaryColor, mb: 4 }}>
                      Envoyez-nous un message
                    </Typography>
                    <form>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <StyledInput
                            fullWidth
                            label="Nom complet"
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <StyledInput
                            fullWidth
                            label="Téléphone"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <StyledInput
                            fullWidth
                            label="Adresse email"
                            variant="outlined"
                            type="email"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <StyledInput
                            fullWidth
                            label="Sujet"
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <StyledInput
                            fullWidth
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              bgcolor: tertiaryColor,
                              color: '#fff',
                              py: 1.5,
                              borderRadius: '8px',
                              textTransform: 'none',
                              fontWeight: 600,
                              boxShadow: `0 8px 25px ${alpha(tertiaryColor, 0.3)}`,
                              '&:hover': {
                                bgcolor: alpha(tertiaryColor, 0.9),
                                boxShadow: `0 12px 30px ${alpha(tertiaryColor, 0.4)}`,
                              }
                            }}
                          >
                            Envoyer Message
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 4, bgcolor: alpha(primaryColor, 0.95) }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color={alpha(lightTextColor, 0.7)}>
                © {new Date().getFullYear()} ASSALA ISKANE. Tous droits réservés.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' }, mt: { xs: 2, md: 0 } }}>
              <Typography variant="body2" color={alpha(lightTextColor, 0.7)}>
                Conçu avec passion | <Box component="span" sx={{ color: quaternaryColor }}>Mentions légales</Box> | <Box component="span" sx={{ color: quaternaryColor }}>Politique de confidentialité</Box>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
        <Tooltip title="Retour en haut" placement="left">
          <Button
            variant="contained"
            onClick={scrollToTop}
            sx={{
              bgcolor: tertiaryColor,
              color: '#fff',
              borderRadius: '50%',
              minWidth: 0,
              width: 56,
              height: 56,
              boxShadow: 4,
              '&:hover': {
                boxShadow: 6,
                bgcolor: alpha(tertiaryColor, 0.9),
                transform: 'translateY(-4px)'
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowUpward />
          </Button>
        </Tooltip>
      </Box>
    </>
  );
}
