import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { listenQuitEvent } from '../services/socketService'; // Adjust the path if necessary