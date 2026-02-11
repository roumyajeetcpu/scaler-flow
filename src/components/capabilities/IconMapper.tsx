
import React from 'react';
import {
    Code2, Smartphone, Bot, Rocket, Star, Zap, Shield,
    ShoppingCart, Edit, Layers, Apple, Refresh,
    MessageCircle, Settings, Cpu, DollarSign, Clock,
    Activity, TrendingUp, CheckCircle, Trophy, Users,
    Code, Lock
} from 'lucide-react';

export const iconMap: Record<string, React.ElementType> = {
    // General
    "rocket": Rocket,
    "star": Star,
    "zap": Zap,
    "shield": Shield,
    "clock": Clock,
    "activity": Activity,
    "trending-up": TrendingUp,
    "check-circle": CheckCircle,
    "trophy": Trophy,
    "users": Users,
    "lock": Lock,
    "dollar-sign": DollarSign,

    // Web Dev
    "code": Code2,
    "shopping-cart": ShoppingCart,
    "edit": Edit,
    "layers": Layers,
    "code-quality": Code,

    // Mobile
    "smartphone": Smartphone,
    "apple": Apple,
    "android": Smartphone, // Fallback if no specific Android icon
    "refresh": Refresh,
    "expertise": Star, // Mapping expertise to Star

    // AI
    "bot": Bot,
    "message-circle": MessageCircle,
    "settings": Settings,
    "cpu": Cpu,

    // Benefits/Generic
    "scale": TrendingUp,
    "communication": MessageCircle,
    "speed": Zap,
    "security": Shield,
    "support": Users
};

interface IconMapperProps {
    name: string;
    className?: string;
}

export const IconMapper: React.FC<IconMapperProps> = ({ name, className }) => {
    const IconComponent = iconMap[name] || Star; // Default to Star if not found
    return <IconComponent className={className} />;
};
