import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import Modal from './Modal';
import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '../hooks/useAuthModal.tsx';

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session ) { 
            onClose();
        }

    }, [session,  onClose]);

    

    const onChange = (open) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <div>
            <Modal
                title="Welcome back"
                description="Login to your account"
                isOpen={isOpen}
                onChange={onChange}>
                <Auth
                    theme='dark'
                    magicLink
                    providers={['github']}
                    supabaseClient={supabaseClient}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#404040',
                                    brandAccent: '#22c55e'
                                }
                            }
                        }
                    }}
                />
            </Modal>
        </div>
    );
};

export default AuthModal;
